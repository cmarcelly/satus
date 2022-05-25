import cn from 'clsx'
import { Link } from 'components/link'
import { Navigation } from 'components/navigation'
import { useStore } from 'lib/store'
import shallow from 'zustand/shallow'
import s from './header.module.scss'

export const Header = ({ headerRef }) => {
  const [navIsOpen, setNavIsOpen] = useStore(
    (state) => [state.navIsOpen, state.setNavIsOpen],
    shallow
  )

  return (
    <header className={s.header} ref={headerRef}>
      <Navigation />
      <div className={cn('layout-block', s.head)}>
        <button
          onClick={() => {
            setNavIsOpen(!navIsOpen)
          }}
        >
          menu
        </button>
        <div>
          <Link href="/">home</Link>/<Link href="/contact">contact</Link>
        </div>
      </div>
    </header>
  )
}
