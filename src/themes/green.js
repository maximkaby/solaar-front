
import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import commonSettings, { handleBackdropFilter } from "./global.js";
import Bg from 'src/assets/images/bg.jpg';

const lightTheme = {
  color: "#fff",
  gold: "#fff",
  gray: "#A3A3A3",
  black: "#000",
  yellow: '#F3C980',
  blueish_gray: "#A8A8A8",
  textHighlightColor: "#93AEBC", // "#F4D092",
  backgroundColor: "#F1F6F5",
  // background:
  // "radial-gradient(circle at 25% 0%, rgba(227,255,240,.5), rgba(227,255,240,0) 50%), radial-gradient(circle at 80% 80%, rgba(131,165,203,.5), rgba(131,165,203,0) 50%)",
  // background: "linear-gradient(180deg, #AFCDE9 1%, #F7FBE7 100%)",
  background: "#FFFFFF",
  paperBg: "#202226CC",
  modalBg: "#FAFAFAEF",
  popoverBg: "rgba(255, 255, 255, 0.95)",
  menuBg: handleBackdropFilter("rgba(255, 255, 255, 0.5)"),
  backdropBg: "rgba(200, 200, 200, 0.4)",
  largeTextColor: "#759AAE",
  activeLinkColor: "#222222",
  activeLinkSvgColor: "invert(64%) sepia(11%) saturate(934%) hue-rotate(157deg) brightness(90%) contrast(86%)",
  // primaryButtonBG: "#759AAE",
  primaryButtonBG: "#F3C980",
  primaryButtonHoverBG: "#F3C980",
  // these need fixing
  primaryButtonHoverColor: "#fff",
  secondaryButtonHoverBG: "rgba(54, 56, 64, 1)",
  outlinedPrimaryButtonHoverBG: "#fff",
  outlinedPrimaryButtonHoverColor: "#333333",
  outlinedSecondaryButtonHoverBG: "#FCFCFC",
  outlinedSecondaryButtonHoverColor: "#333333",
  containedSecondaryButtonHoverBG: "#F3C980",
  graphStrokeColor: "rgba(37, 52, 73, .2)",
};

export const greenTheme = responsiveFontSizes(
  createTheme(
    {
      primary: {
        main: lightTheme.color,
      },
      palette: {
        type: "light",
        background: {
          paper: lightTheme.paperBg,
        },
        contrastText: lightTheme.color,
        primary: {
          main: lightTheme.color,
        },
        neutral: {
          main: lightTheme.color,
          secondary: lightTheme.gray,
        },
        text: {
          primary: lightTheme.color,
          secondary: lightTheme.blueish_gray,
        },
        graphStrokeColor: lightTheme.graphStrokeColor,
      },
      typography: {
        fontFamily: "'Poppins', sans-serif",
        htmlFontSize: 18,
      },
      overrides: {
        MuiCssBaseline: {
          "@global": {
            html: {
              fontSize: 17
            },
            body: {
              background: lightTheme.background,
            },
          },
        },
        MuiPaper: {
          root: {
            backgroundColor: lightTheme.paperBg,
            // "&.ohm-card": {
            //   backgroundColor: lightTheme.paperBg,
            // },
            // "&.ohm-modal": {
            //   backgroundColor: lightTheme.modalBg,
            // },
            // "&.ohm-menu": {
            //   backgroundColor: lightTheme.menuBg,
            //   backdropFilter: "blur(33px)",
            // },
            // "&.ohm-popover": {
            //   backgroundColor: lightTheme.popoverBg,
            //   color: lightTheme.color,
            //   backdropFilter: "blur(15px)",
            // },
          },
        },
        MuiDrawer: {
          paper: {
            backgroundColor: lightTheme.backdropBg,
            zIndex: 7,
          },
        },
        MuiBackdrop: {
          root: {
            backgroundColor: "rgba(255,255,255, 0)",
          },
        },
        MuiLink: {
          root: {
            color: lightTheme.color,
            "&:hover": {
              color: lightTheme.textHighlightColor,
              textDecoration: "none",
              "&.active": {
                color: lightTheme.color,
              },
            },
            "&.active": {
              color: lightTheme.color,
              textDecoration: "underline",
            },
            "@media (hover:none)": {
              "&:hover": {
                color: lightTheme.textHighlightColor,
                textDecoration: "none",
                backgroundColor: "#00000000 !important",
              },
              "&:focus": {
                color: lightTheme.textHighlightColor,
                backgroundColor: "#00000000 !important",
              },
            },
          },
        },
        MuiTableCell: {
          root: {
            color: lightTheme.color,
          },
        },
        MuiInputBase: {
          root: {
            color: lightTheme.color,
          },
        },
        MuiOutlinedInput: {
          notchedOutline: {
            borderColor: `#494949 !important`,
            "&:hover": {
              borderColor: `#494949 !important`,
            },
          },
        },
        MuiTab: {
          textColorPrimary: {
            color: lightTheme.blueish_gray,
            "&$selected": {
              color: lightTheme.yellow,
            },
          },
        },
        PrivateTabIndicator: {
          colorPrimary: {
            backgroundColor: lightTheme.yellow,
          },
        },
        MuiToggleButton: {
          root: {
            backgroundColor: lightTheme.paperBg,
            "&:hover": {
              color: lightTheme.color,
              backgroundColor: lightTheme.containedSecondaryButtonHoverBG,
            },
            selected: {
              backgroundColor: lightTheme.containedSecondaryButtonHoverBG,
            },
            "@media (hover:none)": {
              "&:hover": {
                color: lightTheme.color,
                backgroundColor: lightTheme.paperBg,
              },
              "&:focus": {
                color: lightTheme.color,
                backgroundColor: lightTheme.paperBg,
              },
            },
          },
        },
        MuiIconButton: {
          root: {
            "&:hover": {
              backgroundColor: lightTheme.containedSecondaryButtonHoverBG,
            },
            "@media (hover:none)": {
              "&:hover": {
                color: lightTheme.color,
                backgroundColor: lightTheme.containedSecondaryButtonHoverBG,
              },
              "&:focus": {
                color: lightTheme.color,
                backgroundColor: lightTheme.containedSecondaryButtonHoverBG,
              },
            },
          },
        },
        MuiSelect: {
          select: {
            color: "#93AEBC",
          },
        },
        MuiButton: {
          containedPrimary: {
            color: lightTheme.black,
            backgroundColor: lightTheme.primaryButtonBG,
            "&:hover": {
              backgroundColor: lightTheme.primaryButtonHoverBG,
              color: lightTheme.black,
            },
            "&:disabled": {
              color: lightTheme.color,
            },
            "@media (hover:none)": {
              color: lightTheme.black,
              backgroundColor: lightTheme.primaryButtonBG,
              "&:hover": {
                backgroundColor: `${lightTheme.primaryButtonHoverBG}!important`,
              },
            },
          },
          containedSecondary: {
            color: lightTheme.color,
            backgroundColor: lightTheme.paperBg,
            "&:hover": {
              color: lightTheme.black,
              backgroundColor: `${lightTheme.containedSecondaryButtonHoverBG} !important`,
            },
            "@media (hover:none)": {
              color: lightTheme.color,
              backgroundColor: lightTheme.paperBg,
              "&:hover": {
                color: "#FCFCFC",
                backgroundColor: `${lightTheme.containedSecondaryButtonHoverBG} !important`,
              },
            },
          },
          outlinedPrimary: {
            color: lightTheme.primaryButtonBG,
            borderColor: lightTheme.primaryButtonBG,
            "&:hover": {
              color: lightTheme.black,
              backgroundColor: lightTheme.primaryButtonHoverBG,
              borderColor: lightTheme.primaryButtonBG,
            },
            "@media (hover:none)": {
              color: lightTheme.primaryButtonBG,
              borderColor: lightTheme.primaryButtonBG,
              "&:hover": {
                color: `${lightTheme.black} !important`,
                backgroundColor: `${lightTheme.primaryButtonBG} !important`,
              },
            },
          },
          outlinedSecondary: {
            color: lightTheme.color,
            borderColor: lightTheme.color,
            "&:hover": {
              color: lightTheme.outlinedSecondaryButtonHoverColor,
              backgroundColor: lightTheme.outlinedSecondaryButtonHoverBG,
              borderColor: "#333333",
            },
          },
          textPrimary: {
            color: lightTheme.gray,
            "&:hover": {
              color: lightTheme.textHighlightColor,
              backgroundColor: "#00000000",
            },
            "&:active": {
              color: lightTheme.gold,
              borderBottom: "#fff",
            },
          },
          textSecondary: {
            color: lightTheme.color,
            "&:hover": {
              color: lightTheme.textHighlightColor,
            },
          },
        },
      },
    },
    commonSettings,
  ),
);
