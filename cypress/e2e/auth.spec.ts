import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should allow a user to login", async ({ page }) => {
    await page.goto("/login");

    // Fill login form
    await page.fill('input[type="email"]', "user@example.com");
    await page.fill('input[type="password"]', "password123");

    await page.click('button[type="submit"]');

    // Verify navigation to dashboard
    await page.waitForURL("/dashboard");
    expect(page.url()).toContain("/dashboard");

    // Validate user presence
    await expect(page.locator("text=Welcome, Regular User")).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/login");

    // Invalid credentials
    await page.fill('input[type="email"]', "invalid@example.com");
    await page.fill('input[type="password"]', "wrongpassword");

    await page.click('button[type="submit"]');

    // Validate error message
    await expect(page.locator("text=Login failed")).toBeVisible();
  });

  test("should allow a user to register", async ({ page }) => {
    await page.goto("/register");

    const email = `test-${Date.now()}@example.com`;
    await page.fill("input#name", "Test User");
    await page.fill('input[type="email"]', email);
    await page.fill("input#password", "password123");
    await page.fill("input#confirm-password", "password123");

    await page.click('button[type="submit"]');

    // Validate registration
    await expect(page.locator("text=Registration successful")).toBeVisible();
    await page.waitForURL("/login");
    expect(page.url()).toContain("/login");
  });
});
