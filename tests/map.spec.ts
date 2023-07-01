import { test, expect } from '@playwright/test';

const baseUrl = "http://localhost:8080/";
const routes = ["map"];

test('all pages load', async ({ page }) => {
  for (const route of routes) {
    await page.goto(baseUrl + route);
  }
});

// Homepage link takes users to the map page
test('get started link', async ({ page }) => {
  await page.goto(baseUrl);

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*map/);
});


test('save polygon', async ({ page }) => {
  await page.goto(baseUrl + "map");

  const map = page.getByTestId('map');

  // Click the map to create a polygon.
  map.click({
    position: { x: 200, y: 200 },
  });
  map.click({
    position: { x: 300, y: 300 },
  });
  map.click({
    position: { x: 400, y: 400 },
  });
  map.click({
    position: { x: 200, y: 200 },
  });


  // Click the save button
  await page.getByRole('button', { name: 'Save' }).click();
});