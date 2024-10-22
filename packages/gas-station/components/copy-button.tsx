"use client"

import React, { PropsWithChildren, useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

interface CopyButtonProps {
  text: string
  size?: number
}

const CopyButton = ({
  text,
  size = 16,
  children = text,
}: PropsWithChildren<CopyButtonProps>) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="inline-flex items-center gap-2">
      {children}
      <button onClick={handleCopy}>
        {copied ? <CheckIcon size={size} /> : <CopyIcon size={size} />}
      </button>
    </div>
  )
}

export default CopyButton
