/** @jsxImportSource @emotion/react */
"use client";

import * as React from "react";
import { css, SerializedStyles } from "@emotion/react";
import { cn } from "@/lib/utils";

const cardBaseStyles = css`
  border-radius: 0.75rem;
  border: 1px solid var(--border, #e5e5e5);
  background-color: var(--card, #ffffff);
  color: var(--card-foreground, #171717);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { customCss?: SerializedStyles }
>(({ className, customCss, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    css={[cardBaseStyles, customCss]}
    {...props}
  />
));
Card.displayName = "Card";

const cardHeaderStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1.5rem;
`;

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { customCss?: SerializedStyles }
>(({ className, customCss, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    css={[cardHeaderStyles, customCss]}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const cardTitleStyles = css`
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.025em;
`;

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { customCss?: SerializedStyles }
>(({ className, customCss, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    css={[cardTitleStyles, customCss]}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const cardDescriptionStyles = css`
  font-size: 0.875rem;
  color: var(--muted-foreground, #737373);
`;

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { customCss?: SerializedStyles }
>(({ className, customCss, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    css={[cardDescriptionStyles, customCss]}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const cardContentStyles = css`
  padding: 1.5rem;
  padding-top: 0;
`;

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { customCss?: SerializedStyles }
>(({ className, customCss, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("p-6 pt-0", className)} 
    css={[cardContentStyles, customCss]} 
    {...props} 
  />
));
CardContent.displayName = "CardContent";

const cardFooterStyles = css`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  padding-top: 0;
`;

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { customCss?: SerializedStyles }
>(({ className, customCss, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    css={[cardFooterStyles, customCss]}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
