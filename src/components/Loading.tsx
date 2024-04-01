import React from 'react'

type Props = {}

export default function Loading({ }: Props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 140" width="60" height="60" style={{ display: "block", margin: "auto" }}>
            <radialGradient id="a10" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
                <stop offset="0" stop-color="#ffffff"></stop>
                <stop offset=".3" stop-color="#ffffff" stop-opacity=".9"></stop>
                <stop offset=".6" stop-color="#ffffff" stop-opacity=".6"></stop>
                <stop offset=".8" stop-color="#ffffff" stop-opacity=".3"></stop>
                <stop offset="1" stop-color="#ffffff" stop-opacity="0"></stop>
            </radialGradient>
            <circle transform-origin="center" fill="none" stroke="url(#a10)" stroke-width="10" stroke-linecap="round" stroke-dasharray="140 500" stroke-dashoffset="0" cx="70" cy="70" r="60">
                <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
            </circle>
            <circle transform-origin="center" fill="none" opacity=".2" stroke="#ffffff" stroke-width="10" stroke-linecap="round" cx="70" cy="70" r="60"></circle>
        </svg>

    )
}