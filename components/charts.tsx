"use client"

import { useEffect, useRef } from "react"

interface LineChartProps {
  data: any[]
  xKey: string
  yKeys: string[]
  colors: string[]
  height: number
}

export function LineChart({ data, xKey, yKeys, colors, height }: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const padding = 40

    // Find min and max values
    const allValues = data.flatMap((item) => yKeys.map((key) => item[key]))
    const minValue = Math.min(...allValues)
    const maxValue = Math.max(...allValues)
    const valueRange = maxValue - minValue

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.strokeStyle = "#ccc"
    ctx.stroke()

    // Draw data lines
    yKeys.forEach((key, keyIndex) => {
      ctx.beginPath()
      data.forEach((item, index) => {
        const x = padding + (index * (width - 2 * padding)) / (data.length - 1)
        const y = height - padding - ((item[key] - minValue) / valueRange) * (height - 2 * padding)

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.strokeStyle = colors[keyIndex % colors.length]
      ctx.lineWidth = 2
      ctx.stroke()
    })

    // Draw x-axis labels
    ctx.textAlign = "center"
    ctx.fillStyle = "#666"
    ctx.font = "10px Arial"
    data.forEach((item, index) => {
      const x = padding + (index * (width - 2 * padding)) / (data.length - 1)
      ctx.fillText(item[xKey], x, height - padding + 15)
    })

    // Draw y-axis labels
    ctx.textAlign = "right"
    const steps = 5
    for (let i = 0; i <= steps; i++) {
      const value = minValue + (valueRange * i) / steps
      const y = height - padding - (i / steps) * (height - 2 * padding)
      ctx.fillText(Math.round(value).toString(), padding - 5, y + 3)
    }

    // Draw legend
    const legendX = width - padding - 100
    const legendY = padding
    yKeys.forEach((key, index) => {
      ctx.fillStyle = colors[index % colors.length]
      ctx.fillRect(legendX, legendY + index * 20, 15, 10)
      ctx.fillStyle = "#666"
      ctx.textAlign = "left"
      ctx.fillText(key, legendX + 20, legendY + index * 20 + 8)
    })
  }, [data, xKey, yKeys, colors, height])

  return <canvas ref={canvasRef} width={800} height={height} className="w-full" />
}

interface BarChartProps {
  data: any[]
  xKey: string
  yKeys: string[]
  colors: string[]
  height: number
}

export function BarChart({ data, xKey, yKeys, colors, height }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const padding = 40

    // Find max value
    const allValues = data.flatMap((item) => yKeys.map((key) => item[key]))
    const maxValue = Math.max(...allValues)

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.strokeStyle = "#ccc"
    ctx.stroke()

    // Calculate bar width
    const barGroupWidth = (width - 2 * padding) / data.length
    const barWidth = barGroupWidth / (yKeys.length + 1)

    // Draw bars
    data.forEach((item, itemIndex) => {
      yKeys.forEach((key, keyIndex) => {
        const x = padding + itemIndex * barGroupWidth + (keyIndex + 1) * barWidth - barWidth / 2
        const barHeight = (item[key] / maxValue) * (height - 2 * padding)
        const y = height - padding - barHeight

        ctx.fillStyle = colors[keyIndex % colors.length]
        ctx.fillRect(x - barWidth / 2, y, barWidth, barHeight)
      })
    })

    // Draw x-axis labels
    ctx.textAlign = "center"
    ctx.fillStyle = "#666"
    ctx.font = "10px Arial"
    data.forEach((item, index) => {
      const x = padding + index * barGroupWidth + barGroupWidth / 2
      ctx.fillText(item[xKey], x, height - padding + 15)
    })

    // Draw y-axis labels
    ctx.textAlign = "right"
    const steps = 5
    for (let i = 0; i <= steps; i++) {
      const value = (maxValue * i) / steps
      const y = height - padding - (i / steps) * (height - 2 * padding)
      ctx.fillText(Math.round(value).toString(), padding - 5, y + 3)
    }

    // Draw legend
    const legendX = width - padding - 100
    const legendY = padding
    yKeys.forEach((key, index) => {
      ctx.fillStyle = colors[index % colors.length]
      ctx.fillRect(legendX, legendY + index * 20, 15, 10)
      ctx.fillStyle = "#666"
      ctx.textAlign = "left"
      ctx.fillText(key, legendX + 20, legendY + index * 20 + 8)
    })
  }, [data, xKey, yKeys, colors, height])

  return <canvas ref={canvasRef} width={800} height={height} className="w-full" />
}

interface PieChartProps {
  data: any[]
  nameKey: string
  valueKey: string
  colors: string[]
  height: number
}

export function PieChart({ data, nameKey, valueKey, colors, height }: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !data || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const radius = Math.min(width, height) / 3
    const centerX = width / 2
    const centerY = height / 2

    // Calculate total value
    const total = data.reduce((sum, item) => sum + item[valueKey], 0)

    // Draw pie slices
    let startAngle = 0
    data.forEach((item, index) => {
      const sliceAngle = (2 * Math.PI * item[valueKey]) / total
      const endAngle = startAngle + sliceAngle

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      ctx.fillStyle = colors[index % colors.length]
      ctx.fill()

      // Draw label
      const midAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 1.2
      const labelX = centerX + Math.cos(midAngle) * labelRadius
      const labelY = centerY + Math.sin(midAngle) * labelRadius

      ctx.fillStyle = "#666"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.font = "12px Arial"
      ctx.fillText(`${item[nameKey]}: ${item[valueKey]}%`, labelX, labelY)

      startAngle = endAngle
    })

    // Draw legend
    const legendX = width - 150
    const legendY = height - 100
    data.forEach((item, index) => {
      ctx.fillStyle = colors[index % colors.length]
      ctx.fillRect(legendX, legendY + index * 20, 15, 10)
      ctx.fillStyle = "#666"
      ctx.textAlign = "left"
      ctx.fillText(`${item[nameKey]}: ${item[valueKey]}%`, legendX + 20, legendY + index * 20 + 8)
    })
  }, [data, nameKey, valueKey, colors, height])

  return <canvas ref={canvasRef} width={800} height={height} className="w-full" />
}
