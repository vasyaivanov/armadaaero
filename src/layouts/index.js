import React from 'react'
import '../assets/scss/main.scss'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'

import Hls from 'hls.js'

class Template extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isArticleVisible: false,
      timeout: false,
      articleTimeout: false,
      article: '',
      loading: 'is-loading'
    }
    this.handleOpenArticle = this.handleOpenArticle.bind(this)
    this.handleCloseArticle = this.handleCloseArticle.bind(this)

    this.playbackId = 'bou00Z2KeAUP1RbF01UFG01avDNogxjhY1v';
    this.videoUrl = `https://stream.mux.com/${this.playbackId}.m3u8`;
    this.posterUrl = `https://image.mux.com/${this.playbackId}/thumbnail.png?width=800&height=600&fit_mode=crop`;
  }

  playVideo () {

    const video = this.videoRef;
    const hls = new Hls();

    // HLS.js-specific setup code
    if (Hls.isSupported()) {
      hls.loadSource(this.videoUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
    }
  }

  componentDidMount () {
    this.timeoutId = setTimeout(() => {
        this.setState({loading: ''});
    }, 100);

    if (this.videoRef) {
      this.playVideo();
    }
  }

  componentWillUnmount () {
    if (this.timeoutId) {
        clearTimeout(this.timeoutId);
    }
  }

  handleOpenArticle(article) {

    this.setState({
      isArticleVisible: !this.state.isArticleVisible,
      article
    })

    setTimeout(() => {
      this.setState({
        timeout: !this.state.timeout
      })
    }, 325)

    setTimeout(() => {
      this.setState({
        articleTimeout: !this.state.articleTimeout
      })
    }, 350)

  }

  handleCloseArticle() {

    this.setState({
      articleTimeout: !this.state.articleTimeout
    })

    setTimeout(() => {
      this.setState({
        timeout: !this.state.timeout
      })
    }, 325)

    setTimeout(() => {
      this.setState({
        isArticleVisible: !this.state.isArticleVisible,
        article: ''
      })
    }, 350)

  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    // event.target.mute();
  }

  _onEnd(event) {
    event.target.playVideo();
  }

  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = this.props.data.site.siteMetadata.description

    const videoOptions = {
      autoPlay: true,
      controls: false,
      muted: true,
      loop: true,
      preload: 'auto',
      poster: this.posterUrl,
      src: this.videoUrl
    }

    return (
      <div className={`body ${this.state.loading} ${this.state.isArticleVisible ? 'is-article-visible' : ''}`}>
        <Helmet>
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />
        </Helmet>

        <div id="wrapper">

          <Header onOpenArticle={this.handleOpenArticle} timeout={this.state.timeout} />
          <Main
            isArticleVisible={this.state.isArticleVisible}
            timeout={this.state.timeout}
            articleTimeout={this.state.articleTimeout}
            article={this.state.article}
            onCloseArticle={this.handleCloseArticle}
          />
          <Footer timeout={this.state.timeout} />

        </div>
        {/*<div id="bg"></div>*/}

        <div className="video-background">
          <div className="video-foreground">
            <video id="videobg" ref={(videoRef) => this.videoRef = videoRef} {...videoOptions} />
          </div>
        </div>
      </div>
    )
  }
}

Template.propTypes = {
  route: React.PropTypes.object,
}

export default Template

export const pageQuery = graphql`
  query PageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
