import { storyblokEditable } from '@storyblok/react'
import { Link } from '@studio-freight/compono'
import s from './footer.module.scss'

export function Footer({ data }) {
  return (
    <footer className={s.footer} {...storyblokEditable(data)}>
      <div className="layout-block">
        <h2>
          {data.links.map(({ text, url }, idx) => (
            <Link href={url} key={`footer-link-${idx}`}>
              {text}
            </Link>
          ))}
        </h2>
      </div>
    </footer>
  )
}
