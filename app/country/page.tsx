/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

import stylex from "@stylexjs/stylex";
import { globalTokens as $, spacing, text } from "../globalTokens.stylex";
import { tokens } from "./CardTokens.stylex";
import Image from "next/image";
import Link from "next/link";

type Props = Readonly<{
  flag: string;
  flagAlt: string;
  name: string;
  population: number;
  region: string;
  capital: string;
}>;

export default function Card({
  flag,
  flagAlt,
  name,
  population,
  region,
  capital,
}: Props) {
  return (
    <Link
      {...stylex.props(styles.link)}
      href={`/country/${name}`}
      rel="noopener noreferrer"
      // target="_blank"
    >
      <div {...stylex.props(styles.cardWrap)}>
        <div {...stylex.props(styles.imageWrap)}>
          <Image
            height={0}
            width={0}
            src={flag}
            alt={flagAlt}
            {...stylex.props(styles.imageStyle)}
          />
        </div>

        <h2 {...stylex.props(styles.h2)}>{name}</h2>
        <p {...stylex.props(styles.p)}>
          Population: <span {...stylex.props(styles.span)}>{population}</span>
        </p>
        <p {...stylex.props(styles.p)}>
          Region: <span {...stylex.props(styles.span)}>{region}</span>
        </p>
        <p {...stylex.props(styles.p)}>
          Capital: <span {...stylex.props(styles.span)}>{capital}</span>
        </p>
      </div>
    </Link>
  );
}

type TMobile = "@media (max-width: 700px)";

const MOBILE: TMobile = "@media (max-width: 700px)" as TMobile;
const REDUCE_MOTION = "@media (prefers-reduced-motion: reduce)" as const;

const bgDefault = `rgba(${$.cardR}, ${$.cardG}, ${$.cardB}, 0)` as const;

const styles = stylex.create({
  link: {
    display: {
      default: "flex",
      [MOBILE]: "block",
    },
    justifyContent: "flex-start",
    flexDirection: "column",
    borderRadius: spacing.xs,
    backgroundColor: {
      default: bgDefault,
      ":hover": `rgba(${$.cardR}, ${$.cardG}, ${$.cardB}, 0.1)`,
    },
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: {
      default: `rgba(${$.cardBorderR}, ${$.cardBorderG}, ${$.cardBorderB}, 0)`,
      ":hover": `rgba(${$.cardBorderR}, ${$.cardBorderG}, ${$.cardBorderB}, 0.1)`,
    },
    color: "inherit",
    fontFamily: $.fontSans,
    padding: spacing.sm,
    transitionProperty: "background-color, border-color",
    transitionDuration: "400ms",
    textAlign: "center",
    textDecoration: "none",
    [tokens.arrowTransform]: {
      default: "translateX(0)",
      ":hover": "translateX(4px)",
    },
  },
  cardWrap: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: `rgba(${$.calloutBorderR}, ${$.calloutBorderG}, ${$.calloutBorderB}, 0.3)`,
    borderRadius: spacing.xxxs,
    width: "100%",
    alignItems: "flex-start",
    paddingBottom: {
      default: spacing.md,
      [MOBILE]: spacing.sm,
    },
  },
  imageStyle: {
    position: "absolute",
    height: "100%",
    width: "100%",
    display: "flex",
    objectFit: "cover",
    borderRadius: spacing.xxxs,
  },
  imageWrap: {
    position: "relative",
    width: "100%",
    height: "138px",
  },
  h2: {
    fontSize: text.h5,
    fontWeight: 600,
    paddingLeft: {
      default: spacing.xs,
      [MOBILE]: spacing.xxs,
    },
    marginTop: {
      default: spacing.xs,
      [MOBILE]: spacing.xxs,
    },
    marginBottom: {
      default: spacing.xs,
      [MOBILE]: spacing.xxs,
    },
  },
  span: {
    margin: 0,
    opacity: 0.6,
    fontSize: text.p,
    textWrap: "balance",
    lineHeight: 1.5,
    maxWidth: "30ch",
  },
  p: {
    margin: 0,
    opacity: 0.6,
    fontSize: text.p,
    textWrap: "balance",
    lineHeight: 1.5,
    maxWidth: "30ch",
    paddingLeft: {
      default: spacing.xs,
      [MOBILE]: spacing.xxs,
    },
  },
  color: (color: string) => ({ color }),
  width: (width: string) => ({ width }),
});
