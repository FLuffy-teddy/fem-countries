/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import "./globals.css";
import { globalTokens as $, spacing, text } from "./globalTokens.stylex";
import * as stylex from "@stylexjs/stylex";
import Image from "next/image";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const MEDIA_MOBILE = "@media (max-width: 700px)" as const;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="min-h-full m-0 p-0 bg-slate-700" lang="en">
      <body {...stylex.props(styles.reset, styles.body)}>
        <div {...stylex.props(styles.header)}>
          <h1 {...stylex.props(styles.h1)}>Where in the world?</h1>
          <div {...stylex.props(styles.modeToggle)}>
            <Image
              width={20}
              height={20}
              src="/icon-moon.svg"
              alt="Light Mode"
            />
            <p {...stylex.props(styles.description)}>Dark Mode</p>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}

const DARK = "@media (prefers-color-scheme: dark)";

const styles = stylex.create({
  html: {
    colorScheme: "light dark",
  },
  reset: {
    minHeight: "100%",
    margin: 0,
    padding: 0,
  },
  body: {
    color: `rgba(${$.foregroundR}, ${$.foregroundG}, ${$.foregroundB}, 1)`,
    backgroundImage: {
      default: "linear-gradient(to bottom, rgb(250, 250, 250), white)",
      [DARK]: "linear-gradient(to bottom, rgb(32, 44, 45), black)",
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingLeft: spacing.xxl,
    paddingRight: spacing.xxl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: `rgba(${$.calloutBorderR}, ${$.calloutBorderG}, ${$.calloutBorderB}, 0.3)`,
  },
  modeToggle: {
    display: "flex",
    alignItems: "center",
    height: "fit-content",
  },
  h1: {
    fontSize: text.h3,
    lineHeight: 1,
    fontFamily: $.fontSans,
    fontWeight: 400,
    textAlign: "center",
    display: "flex",
    gap: spacing.md,
    whiteSpace: "nowrap",
    flexDirection: {
      default: "row",
      [MEDIA_MOBILE]: "column",
    },
  },
  description: {
    display: "inherit",
    justifyContent: "inherit",
    alignItems: "inherit",
    fontSize: text.sm,
    maxWidth: $.maxWidth,
    width: "100%",
    zIndex: 2,
    fontFamily: $.fontSans,
    paddingLeft: spacing.xs,
  },
});
