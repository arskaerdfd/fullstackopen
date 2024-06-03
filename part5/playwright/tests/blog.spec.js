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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('huutis')
      await page.getByTestId('password').fill('HuutisUkko')
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByRole('button', {name: 'new blog'}).click()

      await page.getByTestId('title').fill('Testaus')
      await page.getByTestId('author').fill('Testaaja huutis')
      await page.getByTestId('url').fill('google.com')
      await page.getByRole('button', { name: 'create' }).click()
    })
  
    test('a new blog can be created', async ({ page }) => {

      await expect(page.getByText('A new blog, Testaus by Testaaja huutis, added')).toBeVisible()
      await expect(page.getByText('Testaus Testaaja huutis')).toBeVisible()
    })

    test('blog can be liked', async ({page}) => {
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('1')).toBeVisible()
      
    })

    test('user that added the blog can remove it', async ({page}) => {
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'delete' }).click()

      await expect(page.getByText('Testaus Testaaja huutis')).not.toBeVisible()
      await expect(page.getByText('google.com')).not.toBeVisible()

    })

    test('only the user that has added the blog can see the delete button', async ({ page, request }) => {
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Testi Make',
          username: 'huutis2',
          password: 'HuutisUkko'
        }
      })
    
      await page.getByRole('button', { name: 'logout' }).click()
      await page.getByTestId('username').fill('huutis2')
      await page.getByTestId('password').fill('HuutisUkko')
      await page.getByRole('button', { name: 'login' }).click()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
    })

    test.only('the blogs are arranged in the correct order', async ({page, request}) => {


      await page.getByTestId('title').fill('Parempi blogi')
      await page.getByTestId('author').fill('Meitsi')
      await page.getByTestId('url').fill('aalto.fi')
      await page.getByRole('button', { name: 'create' }).click()

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'view' }).click()
      const likeButtons = await page.getByRole('button', { name: 'like' }).all()

      await likeButtons[1].click()

      await page.getByRole('button', { name: 'hide' }).first().click()
      await page.getByRole('button', { name: 'hide' }).click()

      await page.getByRole('button', { name: 'view' }).first().click()
      

      await expect(page.getByText('1')).toBeVisible()

      
      
      
    })
  })
})
