import Link from 'next/link'
import Alert from '../components/alert'
import Footer from '../components/footer'
import Meta from '../components/meta'


export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <header>
          <nav id="main-navbar" class="navbar navbar-default navbar-fixed-top px-40">
            <div class="container navbar-container">
              <div class="navbar-header ">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
                <Link href="/">
                  <a class="navbar-brand"><img width={150} src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/2560px-Nextjs-logo.svg.png" /></a>
                </Link>
              </div>
              <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav navbar-right">
                  <li><Link href="/">Blog</Link></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <section class="full-width-img">

        </section>


        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
