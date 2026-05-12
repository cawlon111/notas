import { test, expect } from '@playwright/test';
import { loginWith, createNote } from '../helper.js';

test.describe('Note app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/testing/users', {
      data: {
        username: 'Danitest',
        name: 'Dani Test',
        password: 'test123'
      }
    });
    await page.goto('/');
  });

  test('front page can be opened', async ({ page }) => {
    await expect(page.getByText('📝 Notas')).toBeVisible();
  });

  test('user can login', async ({ page }) => {
    await loginWith(page, 'Danitest', 'test123');
    await expect(page.locator('.user-name')).toHaveText('Danitest');
  });

  test('login fails with wrong password', async ({ page }) => {
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.fill('input[type="text"]', 'Danitest');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.getByRole('button', { name: 'Entrar' }).click();
    
    const errorMessage = page.getByText('Usuario o contraseña incorrectos');
    await expect(errorMessage).toBeVisible();
    await expect(page.getByText('Bienvenido Danitest')).not.toBeVisible();
  });

  test.describe('when logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'Danitest', 'test123');
      await expect(page.locator('.user-name')).toHaveText('Danitest');
    });

    test('a new note can be created', async ({ page }) => {
      const noteText = `Nota creada por Playwright ${Date.now()}`;
      await createNote(page, noteText);
      
      const noteElement = page.locator('li', { hasText: noteText }).first();
      await expect(noteElement).toBeVisible();
    });

    test.describe('and several notes exist', () => {
      let firstNoteText, secondNoteText, thirdNoteText;

      test.beforeEach(async ({ page }) => {
        firstNoteText = `Primera nota ${Date.now()}`;
        secondNoteText = `Segunda nota ${Date.now()}`;
        thirdNoteText = `Tercera nota ${Date.now()}`;
        
        await createNote(page, firstNoteText);
        await createNote(page, secondNoteText);
        await createNote(page, thirdNoteText);
      });

      test('one of those can be made nonimportant', async ({ page }) => {
        // Encontrar la segunda nota (la del medio)
        const noteElement = page.locator('li', { hasText: secondNoteText }).first();
        
        // Verificar que inicialmente tiene botón "hacer no importante" (porque es importante por defecto)
        await expect(noteElement.getByRole('button', { name: 'hacer no importante' })).toBeVisible();
        
        // Hacer clic para cambiar importancia
        await noteElement.getByRole('button', { name: 'hacer no importante' }).click();
        
        // Esperar un momento
        await page.waitForTimeout(1000);
        
        // Verificar que ahora el botón dice "hacer importante"
        await expect(noteElement.getByRole('button', { name: 'hacer importante' })).toBeVisible();
      });
    });
  });
});
