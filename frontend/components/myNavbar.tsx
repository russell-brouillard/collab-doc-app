// frontend/components/MyNavbar.tsx

"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextUILink,
} from "@nextui-org/react";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";

export default function MyNavbar() {
  const { user } = useUser();

  return (
    <Navbar isBordered>
      {/* Brand Section */}
      <NavbarBrand>
        <p className="font-bold text-inherit ml-2">
          <a href="/">Doc-Collab</a>
        </p>
      </NavbarBrand>

      {/* Navigation Links */}
      <SignedIn>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <NextUILink color="foreground" href="/documents">
              Documents
            </NextUILink>
          </NavbarItem>
          <NavbarItem>
            <NextUILink color="foreground" href="users">
              Users
            </NextUILink>
          </NavbarItem>
        </NavbarContent>
      </SignedIn>

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
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user?.fullName || "User"}
                size="sm"
                src={
                  user?.imageUrl ||
                  "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="info" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.fullName}</p>
              </DropdownItem>
              <DropdownItem key="profile" href="profile">
                My Settings
              </DropdownItem>

              <DropdownItem key="logout" color="danger">
                <SignOutButton />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </SignedIn>
      </NavbarContent>
    </Navbar>
  );
}
