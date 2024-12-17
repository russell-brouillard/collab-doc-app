// frontend/components/MyNavbar.tsx

"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextUILink,
} from "@nextui-org/react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";


export default function MyNavbar() {
  return (
    <Navbar isBordered variant="sticky">
      {/* Brand Section */}
      <NavbarBrand>

        <p className="font-bold text-inherit ml-2">ACME</p>
      </NavbarBrand>

      {/* Navigation Links */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NextUILink color="foreground" href="#">
            Features
          </NextUILink>
        </NavbarItem>
        <NavbarItem isActive>
          <NextUILink aria-current="page" color="secondary" href="#">
            Customers
          </NextUILink>
        </NavbarItem>
        <NavbarItem>
          <NextUILink color="foreground" href="#">
            Integrations
          </NextUILink>
        </NavbarItem>
      </NavbarContent>

      {/* Authentication Section */}
      <NavbarContent as="div" justify="end" className="flex items-center gap-4">
        {/* Show Sign In button when signed out */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-blue-500 text-white rounded transition-colors hover:bg-blue-600">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        {/* Show User Button when signed in */}
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8", // Custom avatar size
              },
            }}
            userProfileMode="navigation" // Dropdown navigation
            userProfileUrl="/profile" // Profile page route
          />
        </SignedIn>
      </NavbarContent>
    </Navbar>
  );
}
