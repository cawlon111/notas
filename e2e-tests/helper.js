export const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.fill('input[type="text"]', username);
  await page.fill('input[type="password"]', password);
  await page.getByRole('button', { name: 'Entrar' }).click();
  await page.waitForTimeout(1000);
};

export const createNote = async (page, content) => {
  await page.getByRole('button', { name: '➕ Nueva nota' }).click();
  await page.waitForTimeout(500);
  await page.fill('input[placeholder="Escribe tu nota aquí..."]', content);
  await page.getByRole('button', { name: 'Guardar' }).click();
  await page.getByText(content).waitFor();  // Esperar a que la nota aparezca
};
