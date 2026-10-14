import { useLayoutEffect } from 'react'

export default function useScrollToTop(page, detail, level) {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [page, detail, level])
}
