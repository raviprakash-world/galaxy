import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { useStore } from '../store'
import { CloseIcon } from './icons'

/** Slide-in readout panel used by every info surface. Bottom sheet on mobile (see CSS). */
export function Panel({ label, onClose, children, foot }: { label: string; onClose?: () => void; children: ReactNode; foot?: ReactNode }) {
  const reduced = useStore((s) => s.reduced)
  const d = reduced ? 0.01 : 0.55
  return (
    <motion.aside
      className="panel" aria-label={label}
      initial={{ opacity: 0, x: reduced ? 0 : 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduced ? 0 : 28 }}
      transition={{ duration: d, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {onClose && <button className="close" onClick={onClose} aria-label="Close panel"><CloseIcon /></button>}
      <div className="panel-scroll">{children}</div>
      {foot && <div className="panel-foot">{foot}</div>}
    </motion.aside>
  )
}

export const Stat = ({ k, v, wide }: { k: string; v: string; wide?: boolean }) => (
  <div className={wide ? 'wide' : undefined}><div className="label">{k}</div><div className="value">{v}</div></div>
)
