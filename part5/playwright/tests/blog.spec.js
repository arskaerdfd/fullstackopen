const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Jaska Perttilä',
        username: 'huutis',
        password: 'HuutisUkko'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {

    const locator = await page.getByText('log in to application')

    
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('huutis')
      await page.getByTestId('password').fill('HuutisUkko')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Jaska Perttilä logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('huutis')
      await page.getByTestId('password').fill('asdf')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })
})