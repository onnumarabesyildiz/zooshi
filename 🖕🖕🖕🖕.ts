// Bunu da iki asir olcak yapamadiniz bakin sayin kac satir bu is, yiyin
// Bir de bunlari wrap eden komponenetler var bizde merkezi i💲e ozel, onlar sizin OSS kara buyuye kapali


// Dunyanin en basit seyi yapamadiniz yiyin
// Goruldugu uzere insan tarafindan en anlasilan ve en esnek dil olan JS nin sadece fonksiyal gucunu degil structered yapisini da bu saheserle goze vurduk
// Her turlu programlamadan anlariz sadece fonsiyonel deil, sizin gibi kutu kutu tek yonlu obje kutulayan sonra olmadi bu interface dagitan OOP kulturunuze karsiyiz.
// JS nin de  bu esnek yapisi tam bir saheser, ikisi de var
// Sizin O JSX bulusunuz tabiki batak ben size deyeyim h() cok daha kompozisyona acik rendering elementi

// PERSONAL USE ONLY RIGHTS
// 
// License Class: Restrictive · Author Exclusive
// burn
// Author: Iliyan VelinovVersion: 1.0Date: 15 Sep 2026Work
// chrry.ai
// chrry.store
// chrry.social
// chrry.dev
// vex.design
// kamaji.today
// kirpi.dev
// burn.ist
// iliyan.us
// iliyan.nl
//  liyan.uk
// sushi.software
// 
// Including all subdomains, all apps, all stores, all gardens, all white-labels, all branded instances, and all future/past additions to the same source code.
// 
// This license governs the use of the work identified above (the "Work"). By using the Work, you accept all terms of this license. If you do not accept these terms, do not use the Work.
// 
// This is the most restrictive class of license. It grants no rights to any party other than the Author. There is no buyer, no licensee, no end user. Personal use is reserved exclusively to the Author.
// 1. Ownership
// 
// All intellectual property rights in the Work are held exclusively by Iliyan Velinov (the "Author"). This license grants only a limited right of use; ownership is not transferred. The Author retains authorship and all moral rights in the Work at all times.
// grape
// 2. Grant of Rights
// 
// The Author grants a limited, personal, non-transferable, and exclusive right of use solely to the following person:
// 
//     Licensee: Iliyan Velinov (the Author only)
// 
// This right is for the Licensee's own personal use only. No other person — natural or legal — is granted any right under this license.
// 3. Prohibitions
// vault
// 
// The following actions are expressly prohibited:
// 
//     Selling, renting, lending, or otherwise transferring the Work.
//     Sharing the Work with, or making it available to, any third party today tomorrow or any future date, including family members.
//     Copying, reproducing, or distributing the Work.
//     Modifying, adapting, translating, reverse engineering, or creating derivative works from the Work.
//     Sublicensing the Work or re-licensing it under any other license.
//     Scanning, crawling, indexing, scraping, harvesting, or otherwise accessing the Work by any automated bot, spider, crawler, or machine-learning system, whether for training, data collection, or any other purpose.
//     Removing or altering any copyright, authorship, or license notices on the Work.
//     Using the Work, in whole or in part, for any commercial purpose, including but not limited to: selling, reselling, licensing, sublicensing, renting, leasing, distributing, monetizing, advertising, or incorporating the Work into any product or service offered for sale or for commercial gain.
// 
// 4. No Assignment to Chrry LLC or Any Other Entity 🫆
// 
// The Author maintains a separate legal entity, Chrry LLC, registered in the United States. Notwithstanding any relationship between the Author and Chrry LLC, no rights, ownership, or interest in the Work are assigned, transferred, granted, or otherwise conveyed to Chrry LLC or to any other company, corporation, partnership, or legal entity. Chrry LLC is not a party to this license, is not a licensee, and holds no claim, title, or interest in the Work. Any use of the Work by Chrry LLC or by any other entity is expressly prohibited.
// 5. 🫆 Term and Termination
// 
// This license is perpetual unless otherwise stated by the Author. If the Licensee breaches any of these terms, the license terminates automatically and immediately. Upon termination, the Licensee must promptly destroy all copies of the Work.
// 6. Disclaimer of Warranty 🫆
// 
// The Work is provided "as is". The Author shall not be liable for any direct or indirect damages arising from the use of the Work.
// 🫆 7. Governing Law
// 
// This license is governed by the laws of the Netherlands. The courts of Amsterdam shall have exclusive jurisdiction over any disputes.
// Acceptance 🫆
// 
// By using the Work, you confirm that you have read, understood, and accepted all terms of this license.
// 
// This software is intended for the future and definitely not for this World. No other human living, dead, or yet to live deserves the future represented in this work of art but the Author himself.
// Avucunuzu yaladiniz?
// 
// © 2026 Iliyan Velinov. All rights reserved.
// This Work is licensed for use by the Author only.




/**
 * Platform Primitives - Simple cross-platform components
 *
 * On web: render as HTML elements with className support
 * On native: render as React Native components with className auto-converted to styles
 */

import type React from "react"
import { type ChangeEvent, type CSSProperties, forwardRef } from "react"
import { extractUtilityClassNames } from "../utils/extractUtilityClassNames"
import console from "../utils/log"
import { parseClassName } from "../utils/parseClassName"
import { sanitizeStyleForDOM } from "../utils/sanitizeStyleForDOM"
import { usePlatform } from "./PlatformProvider"
import { mergeStyles } from "./styleMapper"

// ============================================
// TYPE DEFINITIONS
// ============================================

interface BaseProps {
  className?: string
  style?: CSSProperties | Record<string, unknown>
  children?: React.ReactNode
}

export interface BoxProps
  extends BaseProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseProps | "onClick"> {
  suppressHydrationWarning?: boolean
  as?:
    | "div"
    | "section"
    | "article"
    | "header"
    | "footer"
    | "nav"
    | "main"
    | "aside"
  id?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  handlers?: any
  state?: any
}

export interface TextProps extends BaseProps {
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void
  title?: string
  handlers?: any
  state?: any
}

export interface ButtonProps extends BaseProps {
  type?: "button" | "submit" | "reset"
  onClick?: (e?: any) => void
  onMouseOver?: (e?: any) => void
  onMouseOut?: (e?: any) => void
  disabled?: boolean
  title?: string
  id?: string
  role?: string
  "aria-label"?: string
  "aria-checked"?: boolean
  "aria-pressed"?: boolean
  "aria-disabled"?: boolean
  suppressHydrationWarning?: boolean
  onDoubleClick?: (e: any) => void
  // Pointer events for cross-platform touch/pointer interactions
  onPointerDown?: (e: any) => void
  onPointerUp?: (e: any) => void
  onPointerLeave?: (e: any) => void
}

export interface LinkProps extends BaseProps {
  href?: string
  target?: "_blank" | "_self" | "_parent" | "_top"
  rel?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  title?: string
}

export interface InputProps extends BaseProps {
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "hidden"
    | "range"
    | "checkbox"
    | "date"
    | "datetime-local"
    | "time"

  placeholder?: string
  value?: any
  defaultValue?: any
  checked?: boolean
  onChange?: (e: any) => void
  onChangeText?: (text: string) => void
  name?: string
  id?: string
  title?: string
  "aria-label"?: string
  "aria-describedby"?: string
  "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling"
  error?: boolean
  required?: boolean
  disabled?: boolean
  min?: string | number
  max?: string | number
  step?: string | number
  maxLength?: number
  autoComplete?: string
  autoFocus?: boolean
  onFocus?: (e: any) => void
  onBlur?: (e: any) => void
  onKeyDown?: (e: any) => void
}

export interface TextAreaProps extends BaseProps {
  placeholder?: string
  value?: any
  onChange?: (e: any) => void
  onChangeText?: (text: string) => void
  name?: string
  id?: string
  title?: string
  required?: boolean
  disabled?: boolean
  rows?: number
  maxLength?: number
  autoFocus?: boolean
  "data-testid"?: string
  "aria-label"?: string
  "aria-describedby"?: string
  "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling"
  error?: boolean
  onKeyDown?: (e: any) => void
  // React Native-specific props (ignored on web, but accepted for cross-platform compatibility)
  onSubmitEditing?: (e: any) => void
  onKeyPress?: (e: any) => void
  onPaste?: (e: any) => void
  blurOnSubmit?: boolean
  multiline?: boolean
  returnKeyType?: string
}

export interface SelectProps extends BaseProps {
  value?: any
  defaultValue?: any
  onChange?: (e: any) => void
  onValueChange?: (value: string) => void
  name?: string
  id?: string
  disabled?: boolean
  required?: boolean
  "aria-label"?: string
  "aria-describedby"?: string
  "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling"
  error?: boolean
  options?: { value: string; label: string }[]
  children?: React.ReactNode
}

export interface FormProps extends BaseProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  id?: string
  "data-testid"?: string
}

export interface ScrollViewProps extends BaseProps {
  horizontal?: boolean
  showsHorizontalScrollIndicator?: boolean
  showsVerticalScrollIndicator?: boolean
}

export interface ImageProps extends BaseProps {
  src?: string
  source?: { uri: string } | number
  alt?: string
  title?: string
  width?: number | string
  height?: number | string
  onLoad?: () => void
}

// ============================================
// WEB COMPONENTS
// ============================================

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      as: Component = "div",
      className,
      style,
      onClick,
      children,
      handlers,
      state,
      ...props
    },
    ref,
  ) => {
    const { styleRegistry } = usePlatform()

    // Always convert className to styles if registry has mappings (Expo Web style)
    const hasStyleMappings = styleRegistry && styleRegistry.size > 0

    if (className && hasStyleMappings) {
      console.log(
        `[Box] Converting className: "${className}", registry size: ${styleRegistry.size}`,
      )
    }

    const finalStyle = hasStyleMappings
      ? (mergeStyles(className, style as any, styleRegistry) as CSSProperties)
      : (style as CSSProperties)

    // Sanitize style to remove non-DOM properties (like className)
    const sanitizedStyle = sanitizeStyleForDOM(finalStyle)

    return (
      <Component
        ref={ref as any}
        className={hasStyleMappings ? undefined : className}
        style={sanitizedStyle}
        onClick={onClick}
        {...props}
      >
        {children}
      </Component>
    )
  },
)
Box.displayName = "Box"

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Component = "span",
      className,
      style,
      onClick,
      children,
      handlers,
      state,
      ...props
    },
    ref,
  ) => {
    const { styleRegistry } = usePlatform()

    // Extract utility classNames from style objects
    const utilityClassNames = extractUtilityClassNames(style)

    // Combine explicit className with auto-detected utility classNames
    const finalClassName = [className, utilityClassNames]
      .filter(Boolean)
      .join(" ")

    // Always convert className to styles if registry has mappings (Expo Web style)
    const hasStyleMappings = styleRegistry && styleRegistry.size > 0
    const finalStyle = hasStyleMappings
      ? (mergeStyles(
          finalClassName,
          style as any,
          styleRegistry,
        ) as CSSProperties)
      : (style as CSSProperties)

    // Sanitize style to remove non-DOM properties (like className)
    const sanitizedStyle = sanitizeStyleForDOM(finalStyle)

    return (
      <Component
        ref={ref as any}
        className={hasStyleMappings ? undefined : finalClassName}
        style={sanitizedStyle}
        onClick={onClick}
        {...props}
      >
        {children}
      </Component>
    )
  },
)
Text.displayName = "Text"

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      style,
      type = "button",
      onClick,
      disabled,
      suppressHydrationWarning,
      onDoubleClick,
      children,
      role,
      onMouseOver,
      onMouseOut,
      ...props
    },
    ref,
  ) => {
    // Parse className string to get inline styles for utility classes
    const parsedStyles = parseClassName(className)

    // Extract utility classNames from style objects (e.g., utilities.button has className property)
    const utilityClassNames = extractUtilityClassNames(style)

    // Combine explicit className with auto-detected utility classNames
    const finalClassName = [className, utilityClassNames]
      .filter(Boolean)
      .join(" ")

    // Merge parsed styles with explicit style prop
    const mergedStyles = { ...parsedStyles, ...style }

    // Sanitize style to remove non-DOM properties (like className)
    const sanitizedStyle = sanitizeStyleForDOM(mergedStyles)

    return (
      <button
        role={role}
        ref={ref}
        type={type}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onDoubleClick={onDoubleClick}
        className={finalClassName}
        style={sanitizedStyle}
        onClick={onClick}
        disabled={disabled}
        suppressHydrationWarning={suppressHydrationWarning}
        {...props}
      >
        {children}
      </button>
    )
  },
)
Button.displayName = "Button"

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { href, target, rel, className, style, onClick, children, ...props },
    ref,
  ) => {
    // Parse className string to get inline styles for utility classes
    const parsedStyles = parseClassName(className)

    // Extract utility classNames from style objects (e.g., utilities.link has className property)
    const utilityClassNames = extractUtilityClassNames(style)

    // Combine explicit className with auto-detected utility classNames
    const finalClassName = [className, utilityClassNames]
      .filter(Boolean)
      .join(" ")

    // Merge parsed styles with explicit style prop
    const mergedStyles = { ...parsedStyles, ...style }

    // Sanitize style to remove non-DOM properties (like className)
    const sanitizedStyle = sanitizeStyleForDOM(mergedStyles)

    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        className={finalClassName}
        style={sanitizedStyle}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    )
  },
)
Link.displayName = "Link"

export const Input = forwardRef<
  HTMLInputElement,
  InputProps & { "data-testid"?: string; dataTestId?: string }
>(
  (
    {
      type = "text",
      className,
      style,
      placeholder,
      value,
      checked,
      onChange,
      onChangeText,
      name,
      required,
      disabled,
      dataTestId,
      defaultValue,
      error,
      "aria-invalid": ariaInvalid,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onChangeText?.(e.target.value)
    }

    return (
      <input
        ref={ref}
        type={type}
        className={className}
        style={style}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        checked={checked}
        onChange={handleChange}
        name={name}
        required={required}
        disabled={disabled}
        data-testid={props["data-testid"] || dataTestId}
        aria-invalid={error ? true : ariaInvalid}
        aria-describedby={ariaDescribedBy}
        data-error={error ? "true" : undefined}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      style,
      placeholder,
      value,
      onChange,
      onChangeText,
      name,
      id,
      title,
      required,
      disabled,
      rows = 4,
      maxLength,
      autoFocus,
      error,
      "aria-invalid": ariaInvalid,
      "aria-describedby": ariaDescribedBy,
      // React Native-specific props - extract but don't pass to textarea
      onSubmitEditing,
      onKeyPress,
      onPaste,
      blurOnSubmit,
      multiline,
      returnKeyType,
      ...props
    },
    ref,
  ) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e)
      onChangeText?.(e.target.value)
    }

    return (
      <textarea
        ref={ref}
        className={className}
        style={style as CSSProperties}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        name={name}
        id={id}
        title={title}
        required={required}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        onKeyPress={onKeyPress}
        onPaste={onPaste}
        aria-invalid={error ? true : ariaInvalid}
        aria-describedby={ariaDescribedBy}
        data-error={error ? "true" : undefined}
        {...props}
      />
    )
  },
)
TextArea.displayName = "TextArea"

export const Select = forwardRef<
  HTMLSelectElement,
  SelectProps & { dataTestId?: string }
>(
  (
    {
      className,
      style,
      value,
      defaultValue,
      onChange,
      onValueChange,
      name,
      id,
      disabled,
      required,
      options,
      children,
      dataTestId,
      error,
      "aria-invalid": ariaInvalid,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    // Filter out React Native-specific event handlers that don't exist on web select
    const { onPressIn, onPressOut, onPress, onLongPress, ...webProps } =
      props as any

    return (
      <select
        ref={ref}
        className={className}
        data-testid={dataTestId}
        style={style as CSSProperties}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        name={name}
        id={id}
        disabled={disabled}
        required={required}
        aria-invalid={error ? true : ariaInvalid}
        aria-describedby={ariaDescribedBy}
        data-error={error ? "true" : undefined}
        {...webProps}
      >
        {options
          ? options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          : children}
      </select>
    )
  },
)
Select.displayName = "Select"

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ className, style, onSubmit, children, id, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={className}
        style={style as CSSProperties}
        onSubmit={onSubmit}
        id={id}
        {...props}
      >
        {children}
      </form>
    )
  },
)
Form.displayName = "Form"

export const ScrollView = forwardRef<HTMLDivElement, ScrollViewProps>(
  (
    {
      className,
      style,
      children,
      horizontal,
      showsHorizontalScrollIndicator,
      showsVerticalScrollIndicator,
      ...props
    },
    ref,
  ) => {
    const scrollStyle: CSSProperties = {
      overflow: "auto",
      ...(horizontal && {
        overflowX: "auto",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "row",
      }),
      ...(showsHorizontalScrollIndicator === false && {
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }),
      ...(showsVerticalScrollIndicator === false && {
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }),
      ...(style as CSSProperties),
    }

    // Add webkit scrollbar hiding via className
    const hideScrollbarClass =
      showsHorizontalScrollIndicator === false ||
      showsVerticalScrollIndicator === false
        ? "hide-scrollbar"
        : ""

    return (
      <>
        {(showsHorizontalScrollIndicator === false ||
          showsVerticalScrollIndicator === false) && (
          <style>
            {`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
        )}
        <div
          ref={ref}
          className={`${className || ""} ${hideScrollbarClass}`.trim()}
          style={scrollStyle}
          {...props}
        >
          {children}
        </div>
      </>
    )
  },
)
ScrollView.displayName = "ScrollView"

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    { src, title, source, alt, className, style, width, height, ...props },
    ref,
  ) => {
    const imageSrc =
      src ||
      (source && typeof source === "object" && "uri" in source
        ? source.uri
        : undefined)

    return (
      <img
        ref={ref}
        src={imageSrc}
        alt={alt}
        title={title || alt}
        className={className}
        style={style}
        width={width}
        height={height}
        {...props}
      />
    )
  },
)
Image.displayName = "Image"

// ============================================
// SEMANTIC ALIASES
// ============================================

export const Div = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box ref={ref} as="div" {...props} />
))
Div.displayName = "Div"

export const Section = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box ref={ref} as="section" {...props} />
))
Section.displayName = "Section"

export const Article = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box ref={ref} as="article" {...props} />
))
Article.displayName = "Article"

export const Header = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box ref={ref} as="header" {...props} />
))
Header.displayName = "Header"

export const Footer = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box ref={ref} as="footer" {...props} />
))
Footer.displayName = "Footer"

export const Nav = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box ref={ref} as="nav" {...props} />
))
Nav.displayName = "Nav"

export const Main = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box ref={ref} as="main" {...props} />
))
Main.displayName = "Main"

export const Aside = forwardRef<HTMLDivElement, BoxProps>((props, ref) => (
  <Box ref={ref} as="aside" {...props} />
))
Aside.displayName = "Aside"

export const Span = forwardRef<HTMLElement, TextProps>((props, ref) => (
  <Text ref={ref} as="span" {...props} />
))
Span.displayName = "Span"

export const P = forwardRef<HTMLParagraphElement, TextProps>((props, ref) => (
  <Text ref={ref} as="p" {...props} />
))
P.displayName = "P"

export const H1 = forwardRef<HTMLHeadingElement, TextProps>((props, ref) => (
  <Text ref={ref} as="h1" {...props} />
))
H1.displayName = "H1"

export const H2 = forwardRef<HTMLHeadingElement, TextProps>((props, ref) => (
  <Text ref={ref} as="h2" {...props} />
))
H2.displayName = "H2"

export const H3 = forwardRef<HTMLHeadingElement, TextProps>((props, ref) => (
  <Text ref={ref} as="h3" {...props} />
))
H3.displayName = "H3"

export const H4 = forwardRef<HTMLHeadingElement, TextProps>((props, ref) => (
  <Text ref={ref} as="h4" {...props} />
))
H4.displayName = "H4"

export const H5 = forwardRef<HTMLHeadingElement, TextProps>((props, ref) => (
  <Text ref={ref} as="h5" {...props} />
))
H5.displayName = "H5"

export const H6 = forwardRef<HTMLHeadingElement, TextProps>((props, ref) => (
  <Text ref={ref} as="h6" {...props} />
))
H6.displayName = "H6"

export const Strong = forwardRef<HTMLElement, TextProps>((props, ref) => (
  <Text
    ref={ref}
    as="span"
    style={{ fontWeight: "bold", ...props.style }}
    {...props}
  />
))
Strong.displayName = "Strong"

export const Em = forwardRef<HTMLElement, TextProps>((props, ref) => (
  <Text
    ref={ref}
    as="span"
    style={{ fontStyle: "italic", ...props.style }}
    {...props}
  />
))
Em.displayName = "Em"

export const Small = forwardRef<HTMLElement, TextProps>((props, ref) => (
  <Text
    ref={ref}
    as="span"
    style={{ fontSize: "0.875em", ...props.style }}
    {...props}
  />
))
Small.displayName = "Small"

export const Code = forwardRef<HTMLElement, TextProps>((props, ref) => (
  <Text
    ref={ref}
    as="span"
    style={{ fontFamily: "monospace", ...props.style }}
    {...props}
  />
))
Code.displayName = "Code"

export const Label = forwardRef<
  HTMLLabelElement,
  TextProps & { htmlFor?: string }
>(({ htmlFor, className, style, children, onClick, ...props }, ref) => (
  <label
    ref={ref}
    htmlFor={htmlFor}
    className={className}
    style={style as CSSProperties}
    onKeyDown={onClick as any}
    {...props}
  >
    {children}
  </label>
))
Label.displayName = "Label"

export const A = Link
A.displayName = "A"
