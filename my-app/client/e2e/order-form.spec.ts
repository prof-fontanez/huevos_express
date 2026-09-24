import { test, expect, Page, Locator } from '@playwright/test';

// ---------------------------------------------------------------------------
// Adjust these to match the real site. Everything else uses them.
// ---------------------------------------------------------------------------

// TODO: path of the product page that has the "FORMA DE PEDIDO" button
const PRODUCT_PAGE = '/product';

// TODO: accessible names (labels) of the quantity dropdowns
const TIPO_LABEL = 'Tipo';
const CANTIDAD_LABEL = 'Cantidad';
const TIPO_OPTIONS = { plato: 'Platos', caja: 'Caja' } as const;

const TEST_MESSAGE = 'Mensaje de prueba';

// TODO: visible labels of the form fields
const FIELD_LABELS = {
  nombre: 'Nombre',
  negocio: 'Nombre del negocio',
  direccion: 'Dirección',
  pueblo: 'Pueblo',
  codigoPostal: 'Código Postal',
  telefono: 'Teléfono',
  correo: 'Correo electrónico',
  mensaje: 'Mensaje (opcional)',
} as const;

const VALID = {
  nombre: 'Hector Fontanez',
  negocio: 'Mi Negocio',
  direccion: '4533 Badlands Dr',
  pueblo: 'Fort Worth',
  codigoPostal: '76179',
  telefono: '8179966578',
  correo: 'hector.fontanez@sbcglobal.net',
};

type FieldKey = keyof typeof FIELD_LABELS;
type RequiredField = keyof typeof VALID;
const REQUIRED = Object.keys(VALID) as RequiredField[];

const CONFIRMATION =
  'Muchas gracias por su encargo. Procesaremos su orden dependiendo de la prioridad seleccionada.';

// Tests tagged @submits send a real order. Run them only against local/dev,
// or exclude them with: npx playwright test --grep-invert @submits
const SUBMITS = { tag: '@submits' };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Matches "Nombre" and "Nombre *" but not "Nombre del negocio"
const field = (page: Page, key: FieldKey) =>
  page.getByLabel(new RegExp(`^${escapeRegex(FIELD_LABELS[key])}\\s*\\*?$`, 'i'));

// The form counts as "open" while its ORDENAR button is visible.
const ordenar = (page: Page) => page.getByRole('button', { name: 'ORDENAR' });
const requerido = (page: Page) => page.getByText('Requerido', { exact: true });
const correoInvalido = (page: Page) => page.getByText('Correo inválido', { exact: true });

async function openOrderForm(page: Page) {
  await page.goto(PRODUCT_PAGE);
  await page.getByRole('button', { name: 'FORMA DE PEDIDO' }).click();
  await expect(ordenar(page)).toBeVisible();
}

async function fillValid(
  page: Page,
  { except, mensaje = TEST_MESSAGE }: { except?: RequiredField; mensaje?: string | null } = {},
) {
  for (const key of REQUIRED) {
    if (key !== except) await field(page, key).fill(VALID[key]);
  }
  // Pass mensaje: null to leave the field blank.
  if (mensaje !== null) await field(page, 'mensaje').fill(mensaje);
}

async function isNativeSelect(dropdown: Locator) {
  return (await dropdown.evaluate((el) => el.tagName)) === 'SELECT';
}

const dropdown = (page: Page, label: string) =>
  page.getByRole('combobox', { name: new RegExp(`^${escapeRegex(label)}\\b`, 'i') });

const optionName = (value: string) =>
  new RegExp(`^\\s*${escapeRegex(value)}\\b`, 'i');

async function dropdownOptions(page: Page, label: string): Promise<string[]> {
  const dd = dropdown(page, label);
  let texts: string[];
  if (await isNativeSelect(dd)) {
    texts = await dd.locator('option').allTextContents();
  } else {
    await dd.click();
    const options = page.getByRole('option');
    texts = await options.allTextContents();
    await options.first().click(); // closes the menu
  }
  return texts.map((t) => t.trim());
}

async function selectFromDropdown(page: Page, label: string, value: string) {
  const dd = dropdown(page, label);
  if (await isNativeSelect(dd)) {
    const texts = await dd.locator('option').allTextContents();
    const match = texts.find((t) => optionName(value).test(t.trim()));
    await dd.selectOption({ label: match?.trim() ?? value });
    await expect(dd.locator('option:checked')).toHaveText(optionName(value));
  } else {
    await dd.click();
    await page.getByRole('option', { name: optionName(value) }).click();
    await expect(dd).toContainText(optionName(value));
  }
}

async function selectQuantity(page: Page, label: string, value: string) {
  const dropdown = page.getByLabel(label);
  if (await isNativeSelect(dropdown)) {
    await dropdown.selectOption({ label: value });
    await expect(dropdown.locator('option:checked')).toHaveText(value);
  } else {
    await dropdown.click();
    await page.getByRole('option', { name: value, exact: true }).click();
    await expect(dropdown).toContainText(value);
  }
}

// ---------------------------------------------------------------------------
// Quantity (TC-01 to TC-10)
// ---------------------------------------------------------------------------

const QUANTITY_RULES = [
  { product: 'plato', min: 3, max: 11, nominal: 7,
    ids: { min: 'TC-01', max: 'TC-02', below: 'TC-03', above: 'TC-04', nominal: 'TC-05' } },
  { product: 'caja', min: 1, max: 3, nominal: 2,
    ids: { min: 'TC-06', max: 'TC-07', below: 'TC-08', above: 'TC-09', nominal: 'TC-10' } },
] as const;

for (const rule of QUANTITY_RULES) {
  test.describe(`Quantity: ${rule.product}`, () => {
    test.beforeEach(async ({ page }) => {
      await openOrderForm(page);
      await selectFromDropdown(page, TIPO_LABEL, TIPO_OPTIONS[rule.product]);
    });

    const selectable = [
      [rule.ids.min, rule.min],
      [rule.ids.max, rule.max],
      [rule.ids.nominal, rule.nominal],
    ] as const;
    for (const [id, n] of selectable) {
      test(`${id} ${n} can be selected`, async ({ page }) => {
        await selectFromDropdown(page, CANTIDAD_LABEL, String(n));
      });
    }

    const notOffered = [
      [rule.ids.below, rule.min - 1],
      [rule.ids.above, rule.max + 1],
    ] as const;
    for (const [id, n] of notOffered) {
      test(`${id} ${n} is not offered`, async ({ page }) => {
        const numbers = (await dropdownOptions(page, CANTIDAD_LABEL))
          .map((t) => t.match(/^\s*(\d+)/)?.[1])
          .filter((x): x is string => !!x);
        expect(numbers.length).toBeGreaterThan(0); // guard against a vacuous pass
        expect(numbers).not.toContain(String(n));
      });
    }
  });
}

// ---------------------------------------------------------------------------
// Required fields (TC-11 to TC-15)
// ---------------------------------------------------------------------------

test.describe('Required fields', () => {
  test.beforeEach(async ({ page }) => openOrderForm(page));

  test('TC-11 all required filled, mensaje blank -> confirmation', SUBMITS, async ({ page }) => {
    await fillValid(page, { mensaje: null });
    await ordenar(page).click();
    await expect(ordenar(page)).toBeHidden();
    await expect(page.getByText(CONFIRMATION)).toBeVisible();
  });

  test('TC-12 all blank -> Requerido under each required field', async ({ page }) => {
    await ordenar(page).click();
    // Exactly 7: one per required field, none under mensaje.
    await expect(requerido(page)).toHaveCount(REQUIRED.length);
    await expect(ordenar(page)).toBeVisible();
  });

  for (const key of REQUIRED) {
    test(`TC-13 only ${key} blank -> one Requerido`, async ({ page }) => {
      await fillValid(page, { except: key });
      await ordenar(page).click();
      await expect(requerido(page)).toHaveCount(1);
      await expect(ordenar(page)).toBeVisible();
    });
  }

  test('TC-14 all fields filled incl. mensaje -> confirmation', SUBMITS, async ({ page }) => {
    await fillValid(page);
    await ordenar(page).click();
    await expect(ordenar(page)).toBeHidden();
    await expect(page.getByText(CONFIRMATION)).toBeVisible();
  });

  test('TC-15 typing in a blank field removes its Requerido', async ({ page }) => {
    await ordenar(page).click();
    await expect(requerido(page)).toHaveCount(REQUIRED.length);
    await field(page, 'nombre').fill(VALID.nombre);
    await expect(requerido(page)).toHaveCount(REQUIRED.length - 1);
  });
});

// ---------------------------------------------------------------------------
// Correo electrónico (TC-16 to TC-21)
// ---------------------------------------------------------------------------

test.describe('Correo electrónico', () => {
  test.beforeEach(async ({ page }) => openOrderForm(page));

  test('TC-16 valid email -> no error, confirmation', SUBMITS, async ({ page }) => {
    await fillValid(page);
    await ordenar(page).click();
    await expect(correoInvalido(page)).toHaveCount(0);
    await expect(page.getByText(CONFIRMATION)).toBeVisible();
  });

  const INVALID_EMAILS = [
    ['TC-17', 'clienteejemplo.com', 'no @'],
    ['TC-18', 'cliente@', 'no domain'],
    ['TC-19', '@ejemplo.com', 'no local part'],
    ['TC-20', 'cliente @ejemplo.com', 'contains a space'],
  ] as const;

  for (const [id, email, why] of INVALID_EMAILS) {
    test(`${id} invalid email (${why}) -> Correo inválido`, async ({ page }) => {
      await fillValid(page);
      await field(page, 'correo').fill(email);
      await ordenar(page).click();
      await expect(correoInvalido(page)).toBeVisible();
      await expect(ordenar(page)).toBeVisible();
    });
  }

  test('TC-21 invalid email without ORDENAR -> no error yet', async ({ page }) => {
    await field(page, 'correo').fill('clienteejemplo.com');
    await expect(correoInvalido(page)).toHaveCount(0);
  });
});

// ---------------------------------------------------------------------------
// Código postal (TC-22 to TC-25)
// pressSequentially types key by key like a user; fill() would throw on a
// type="number" input before the app ever sees the characters.
// ---------------------------------------------------------------------------

test.describe('Código postal', () => {
  test.beforeEach(async ({ page }) => openOrderForm(page));

  test('TC-22 numeric input is accepted', async ({ page }) => {
    await field(page, 'codigoPostal').pressSequentially('00725');
    await expect(field(page, 'codigoPostal')).toHaveValue('00725');
  });

  const NON_NUMERIC = [
    ['TC-23', 'ABCDE', 'letters'],
    ['TC-24', '00a25', 'mixed'],
    ['TC-25', '007-25', 'symbols'],
  ] as const;

  for (const [id, input, why] of NON_NUMERIC) {
    test(`${id} non-numeric input (${why}) is not accepted`, async ({ page }) => {
      await field(page, 'codigoPostal').pressSequentially(input);
      expect(await field(page, 'codigoPostal').inputValue()).toMatch(/^\d*$/);
    });
  }
});

// ---------------------------------------------------------------------------
// Opening and dismissing (TC-26 to TC-31)
// ---------------------------------------------------------------------------

test.describe('Opening and dismissing', () => {
  test('TC-26 FORMA DE PEDIDO opens the form with both buttons', async ({ page }) => {
    await openOrderForm(page);
    await expect(page.getByRole('button', { name: 'CANCELAR' })).toBeVisible();
    await expect(ordenar(page)).toBeVisible();
  });

  test('TC-27 CANCELAR dismisses the form', async ({ page }) => {
    await openOrderForm(page);
    await page.getByRole('button', { name: 'CANCELAR' }).click();
    await expect(ordenar(page)).toBeHidden();
  });

  test('TC-28 ESC dismisses the form', async ({ page }) => {
    await openOrderForm(page);
    await page.keyboard.press('Escape');
    await expect(ordenar(page)).toBeHidden();
  });

  test('TC-29 clicking outside dismisses the form', async ({ page }) => {
    await openOrderForm(page);
    // TODO: make sure this point is outside the form on your layout.
    await page.mouse.click(5, 5);
    await expect(ordenar(page)).toBeHidden();
  });

  test('TC-30 refreshing dismisses the form', async ({ page }) => {
    await openOrderForm(page);
    await page.reload();
    await expect(ordenar(page)).toBeHidden();
  });

  test('TC-31 switching tabs keeps the form open', async ({ page, context }) => {
    await openOrderForm(page);
    const otherTab = await context.newPage();
    await otherTab.bringToFront();
    await page.bringToFront();
    // Headless browsers may not fire visibility events; run headed to be sure.
    await expect(ordenar(page)).toBeVisible();
  });
});

// ---------------------------------------------------------------------------
// Confirmation popup (TC-32)
// ---------------------------------------------------------------------------

test('TC-32 CERRAR closes the confirmation popup', SUBMITS, async ({ page }) => {
  await openOrderForm(page);
  await fillValid(page);
  await ordenar(page).click();
  await expect(page.getByText(CONFIRMATION)).toBeVisible();
  await page.getByRole('button', { name: 'CERRAR' }).click();
  await expect(page.getByText(CONFIRMATION)).toBeHidden();
});
