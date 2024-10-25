'use client'

import * as React from "react"
import { SVGProps } from "react"

export const BookIcon = (
  props: SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={41}
    height={41}
    fill="none"
    {...props}
  >
    <rect width={41} height={41} fill="#F0D1A8" rx={3} />
    <path
      fill="#fff"
      d="M15.375 10.25h21.781v5.125H15.375zM15.375 19.219h21.781v5.125H15.375zM15.375 28.188h21.781v5.125H15.375z"
    />
  </svg>
)