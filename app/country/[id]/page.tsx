import Link from "next/link";
import stylex from "@stylexjs/stylex";
import { tokens } from "./PageToken.stylex";
import {
  globalTokens as $,
  spacing,
  text,
} from "../../../app/globalTokens.stylex";
import Image from "next/image";

async function getCountry(countryId: string) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${countryId}`, {
    next: { revalidate: 10 },
  });
  const data = await res.json();
  return data;
}

export default async function CountryPage({ params }: any) {
  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const country = await getCountry(params.id);
  console.log(country);
  const languageArray: any = Object.values(country[0].languages);
  console.log(languageArray);

  const countryPop = numberWithCommas(country[0].population);
  return (
    <div>
      <Link href="/">
        <p>
          <span {...stylex.props(styles.back)}></span> Back
        </p>
      </Link>
      <div {...stylex.props(styles.fifty)}>
        <div {...stylex.props(styles.left)}>
          <Image
            height={0}
            width={0}
            src={country[0].flags.svg}
            alt={country[0].flagAlt}
            {...stylex.props(styles.imageStyle)}
          />
        </div>
        <div {...stylex.props(styles.right, styles.padding)}>
          <h1 {...stylex.props(styles.title)}>{country[0].name.common}</h1>
          <div {...stylex.props(styles.fifty)}>
            <div {...stylex.props(styles.left)}>
              <h2 {...stylex.props(styles.text)}>
                Native Name:{" "}
                <span {...stylex.props(styles.span)}>
                  {country[0].name.nativeName.eng.common}
                </span>
              </h2>
              <h2 {...stylex.props(styles.text)}>
                Population:{" "}
                <span {...stylex.props(styles.span)}>{countryPop}</span>
              </h2>
              <h2 {...stylex.props(styles.text)}>
                Region:{" "}
                <span {...stylex.props(styles.span)}>{country[0].region}</span>
              </h2>
              <h2 {...stylex.props(styles.text)}>
                Sub Region:{" "}
                <span {...stylex.props(styles.span)}>
                  {country[0].subregion}
                </span>
              </h2>
              <h2 {...stylex.props(styles.text)}>
                Capital:{" "}
                <span {...stylex.props(styles.span)}>{country[0].capital}</span>
              </h2>
            </div>
            <div {...stylex.props(styles.right)}>
              <h2 {...stylex.props(styles.text)}>
                Top Level Domain:{" "}
                <span {...stylex.props(styles.span)}>{country[0].tld[0]}</span>
              </h2>
              <h2 {...stylex.props(styles.text)}>
                Currencies:{" "}
                <span {...stylex.props(styles.span)}>
                  {country[0].currencies.ERN.name}
                </span>
              </h2>
              <h2 {...stylex.props(styles.text)}>
                Languages:
                <span>
                  {languageArray.map((item: string, i: number) => {
                    return <span key={i}>{item[i]}</span>;
                  })}
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MEDIA_MOBILE = "@media (max-width: 700px)" as const;
const MEDIA_TABLET =
  "@media (min-width: 701px) and (max-width: 1120px)" as const;

const styles = stylex.create({
  fifty: {
    display: "grid",
    margin: "auto",
    gridAutoRows: "1fr",
    gridTemplateColumns: "repeat(2, 50%)",
    width: $.maxWidth,
    maxWidth: {
      default: "100%",
      [MEDIA_MOBILE]: 320,
    },
    textAlign: { [MEDIA_MOBILE]: "center" },
  },
  back: {
    display: "flex",
  },
  p: {
    margin: 0,
    opacity: 0.6,
    fontSize: text.p,
    textWrap: "balance",
    lineHeight: 1.5,
    maxWidth: "30ch",
    paddingLeft: spacing.xs,
  },
  imageStyle: {
    position: "absolute",
    height: "100%",
    width: "100%",
    display: "flex",
    objectFit: "cover",
    borderRadius: spacing.xxxs,
  },
  left: {
    position: "relative",
    width: "90%",
    height: "auto",
    marginRight: "auto",
  },
  right: {
    width: "90%",
    marginLeft: "auto",
    display: "flex",
    flexDirection: "column",
  },
  padding: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  text: {
    fontSize: text.p,
    paddingTop: spacing.xxs,
    paddingBottom: spacing.xxs,
  },
  span: {
    color: "#d3d3d39c",
  },
  title: {
    paddingBottom: spacing.md,
  },
});
