/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import stylex from "@stylexjs/stylex";
import Card from "./country/page";
import { globalTokens as $, spacing } from "./globalTokens.stylex";

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
  search: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    width: "25%",
    maxWidth: "320px",
    marginLeft: spacing.xxl,
    marginRight: spacing.xxl,
    padding: spacing.xxs,
    border: "none",
    borderRadius: spacing.xxxs,
  },
  grid: {
    display: "grid",
    margin: "auto",
    gridAutoRows: "1fr",
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

export default async function Home() {
  const data = await getData();
  // console.log(data);
  return (
    <main {...stylex.props(style.main)}>
      <input {...stylex.props(style.search)}></input>

      <div {...stylex.props(style.grid)}>
        {data.map((post: any, i: number) => {
          return (
            <Card
              key={i}
              flag={post.flags.svg}
              flagAlt={post.flags.alt}
              name={post.name.common}
              population={post.population}
              region={post.region}
              capital={post.capital}
            />
          );
        })}
      </div>
    </main>
  );
}

async function getData() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
