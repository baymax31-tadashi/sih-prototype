"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
const MenuIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)
import Link from "next/link"
import Image from "next/image"
import { LanguageSwitcher } from "./language-switcher"
import { useTranslation } from "@/lib/translations"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/samudrasetu-logo.png"
              alt="SAMUDRASETU Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">SAMUDRASETU</h1>
              <p className="text-sm text-muted-foreground">Coastal Safety Bridge</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/report" className="text-foreground hover:text-primary transition-colors">
              {t("reportHazard")}
            </Link>
            <Link href="/dashboard" className="text-foreground hover:text-primary transition-colors">
              {t("dashboard")}
            </Link>
            <Link href="/media" className="text-foreground hover:text-primary transition-colors">
              {t("mediaGallery")}
            </Link>
            <Link href="/analytics" className="text-foreground hover:text-primary transition-colors">
              {t("analytics")}
            </Link>
            <Link href="/community" className="text-foreground hover:text-primary transition-colors">
              {t("community")}
            </Link>
            <Link href="/admin" className="text-foreground hover:text-primary transition-colors">
              {t("admin")}
            </Link>
            <LanguageSwitcher />
            <Link href="/login" className="text-foreground hover:text-primary transition-colors">
              {t("login")}
            </Link>
            <Button asChild>
              <Link href="/register">{t("getStarted")}</Link>
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-4 mt-8">
                <Link
                  href="/report"
                  className="text-foreground hover:text-primary transition-colors p-2"
                  onClick={() => setIsOpen(false)}
                >
                  {t("reportHazard")}
                </Link>
                <Link
                  href="/dashboard"
                  className="text-foreground hover:text-primary transition-colors p-2"
                  onClick={() => setIsOpen(false)}
                >
                  {t("dashboard")}
                </Link>
                <Link
                  href="/media"
                  className="text-foreground hover:text-primary transition-colors p-2"
                  onClick={() => setIsOpen(false)}
                >
                  {t("mediaGallery")}
                </Link>
                <Link
                  href="/analytics"
                  className="text-foreground hover:text-primary transition-colors p-2"
                  onClick={() => setIsOpen(false)}
                >
                  {t("analytics")}
                </Link>
                <Link
                  href="/community"
                  className="text-foreground hover:text-primary transition-colors p-2"
                  onClick={() => setIsOpen(false)}
                >
                  {t("community")}
                </Link>
                <Link
                  href="/admin"
                  className="text-foreground hover:text-primary transition-colors p-2"
                  onClick={() => setIsOpen(false)}
                >
                  {t("admin")}
                </Link>
                <div className="p-2">
                  <LanguageSwitcher />
                </div>
                <Link
                  href="/login"
                  className="text-foreground hover:text-primary transition-colors p-2"
                  onClick={() => setIsOpen(false)}
                >
                  {t("login")}
                </Link>
                <Button asChild className="mt-4">
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    {t("getStarted")}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
