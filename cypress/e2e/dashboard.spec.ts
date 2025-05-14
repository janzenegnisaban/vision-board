import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
  // Before each test, log in as a regular user
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "user@example.com");
    await page.fill('input[type="password"]', "password123");
    await page.click('button[type="submit"]');
    await page.waitForURL("/dashboard");
  });

  test("should display the dashboard page", async ({ page }) => {
    // Verify key dashboard elements
    await expect(page.locator('h2:has-text("Dashboard")')).toBeVisible();
    await expect(page.locator("text=Welcome, Regular User")).toBeVisible();

    // Validate available tabs
    await expect(page.locator('button:has-text("Overview")')).toBeVisible();
    await expect(page.locator('button:has-text("Announcements")')).toBeVisible();
    await expect(page.locator('button:has-text("Events")')).toBeVisible();
  });

  test("should navigate to announcements page", async ({ page }) => {
    await page.click('a:has-text("Announcements")');
    await page.waitForURL("/dashboard/announcements");
    await expect(page.locator('h2:has-text("Announcements")')).toBeVisible();
  });

  test("should navigate to events page", async ({ page }) => {
    await page.click('a:has-text("Events")');
    await page.waitForURL("/dashboard/events");
    await expect(page.locator('h2:has-text("Events")')).toBeVisible();
  });

  test("should navigate to information page", async ({ page }) => {
    await page.click('a:has-text("Information")');
    await page.waitForURL("/dashboard/information");
    await expect(page.locator('h2:has-text("Organization Information")')).toBeVisible();
  });

  const BASE_URL = "http://localhost:3000"; // Define your application's base URL

test("should logout successfully", async ({ page }) => {
  await page.click('button:has-text("Log out")');

  // Ensure session is cleared
  await page.waitForURL("/");
  expect(page.url()).toBe(`${BASE_URL}/`);

  // Ensure session storage and local storage are empty
  const sessionData = await page.evaluate(() => sessionStorage.length);
  const localData = await page.evaluate(() => localStorage.length);

  expect(sessionData).toBe(0);
  expect(localData).toBe(0);

  // Confirm login button is visible again
  await expect(page.locator('button:has-text("Login")')).toBeVisible();
});
  test("should show error for unauthorized access", async ({ page }) => {
    await page.goto("/dashboard/announcements");
    await expect(page.locator("text=Unauthorized")).toBeVisible();
  });
});
