/* eslint-disable */
export type Token = `colors.${ColorToken}` | `spacing.${SpacingToken}` | `radii.${RadiusToken}` | `breakpoints.${BreakpointToken}` | `sizes.${SizeToken}`

export type ColorPalette = "gray" | "blue" | "red" | "green" | "orange"

export type ColorToken = "gray.50" | "gray.100" | "gray.200" | "gray.300" | "gray.400" | "gray.500" | "gray.600" | "gray.700" | "gray.800" | "gray.900" | "blue.50" | "blue.600" | "red.600" | "green.500" | "orange.600" | "colorPalette.50" | "colorPalette.100" | "colorPalette.200" | "colorPalette.300" | "colorPalette.400" | "colorPalette.500" | "colorPalette.600" | "colorPalette.700" | "colorPalette.800" | "colorPalette.900"

export type SpacingToken = "0" | "1" | "2" | "3" | "4" | "6" | "8" | "-0" | "-1" | "-2" | "-3" | "-4" | "-6" | "-8"

export type RadiusToken = "sm" | "md" | "lg"

export type BreakpointToken = "sm" | "md" | "lg" | "xl" | "2xl"

export type SizeToken = "breakpoint-sm" | "breakpoint-md" | "breakpoint-lg" | "breakpoint-xl" | "breakpoint-2xl"

export type Tokens = {
		colors: ColorToken
		spacing: SpacingToken
		radii: RadiusToken
		breakpoints: BreakpointToken
		sizes: SizeToken
} & { [token: string]: never }

export type TokenCategory = "aspectRatios" | "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "cursor" | "shadows" | "spacing" | "radii" | "borders" | "borderWidths" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"