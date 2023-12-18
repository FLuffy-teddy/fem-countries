/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import stylex from "@stylexjs/stylex";
import Card from "./Card";
import { globalTokens as $, spacing, text } from "./globalTokens.stylex";
import Image from "next/image";
import Test from "./apiCall";

const MEDIA_MOBILE = "@media (max-width: 700px)" as const;
const MEDIA_TABLET =
  "@media (min-width: 701px) and (max-width: 1120px)" as const;

const style = stylex.create({
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    paddingBottom: {
      default: spacing.xxl,
      [MEDIA_MOBILE]: spacing.md,
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
    background: `rgba(${$.calloutBorderR}, ${$.calloutBorderG}, ${$.calloutBorderB}, 0.3)`,
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
  search: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    width: "25%",
    marginLeft: spacing.xxl,
    marginRight: spacing.xxl,
    padding: spacing.xxs,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(4, minmax(25%, auto))",
      [MEDIA_MOBILE]: "1fr",
      [MEDIA_TABLET]: "repeat(2, 50%)",
    },
    width: $.maxWidth,
    maxWidth: {
      default: "100%",
      [MEDIA_MOBILE]: 320,
    },
    textAlign: { [MEDIA_MOBILE]: "center" },
  },
});

const HOMEPAGE = "https://stylexjs.com";

export default function Home() {
  return (
    <main {...stylex.props(style.main)}>
      <Test />
      <div {...stylex.props(style.header)}>
        <h1 {...stylex.props(style.h1)}>Where in the world?</h1>
        <div {...stylex.props(style.modeToggle)}>
          <Image width={20} height={20} src="/icon-moon.svg" alt="Light Mode" />
          <p {...stylex.props(style.description)}>Dark Mode</p>
        </div>
      </div>

      <input {...stylex.props(style.search)}></input>

      <div {...stylex.props(style.grid)}></div>
    </main>
  );
}
