#!/usr/bin/env bash
# Rasterises the SVG sources in assets/ and public/ into the PNGs that social
# previews and iOS home-screen icons need (neither accepts SVG).
#
# Uses macOS qlmanage so there is no image-processing dependency in the project.
# On Linux, install librsvg and swap the render() body for:
#   rsvg-convert -w "$2" -h "$3" -o "$4" "$1"
set -euo pipefail
cd "$(dirname "$0")/.."

# qlmanage always emits a square canvas, letterboxing non-square art, so a
# non-square target needs an explicit centre crop afterwards.
render() { # svg  max-dimension  out.png  [crop-w crop-h]
  local tmp; tmp="$(mktemp -d)"
  qlmanage -t -s "$2" -o "$tmp" "$1" >/dev/null 2>&1
  mv "$tmp/$(basename "$1").png" "$3"
  rm -rf "$tmp"
  if [ $# -ge 5 ]; then
    sips -c "$5" "$4" "$3" >/dev/null   # sips takes height then width
  fi
  echo "  wrote $3 ($(sips -g pixelWidth -g pixelHeight "$3" | awk '/pixel/{printf "%s ", $2}'))"
}

render assets/og-image.svg 1200 public/og-image.png 1200 630
render public/logo.svg      512 public/icon-512.png
render public/logo.svg      180 public/apple-touch-icon.png
echo "Done. Commit the PNGs — the build copies public/ verbatim."
