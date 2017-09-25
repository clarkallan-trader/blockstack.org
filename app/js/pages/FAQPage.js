'use strict'

import {Component}         from 'react'
import {Link}              from 'react-router'
import DocumentTitle       from 'react-document-title'
import Footer              from '../components/Footer'
import marked              from 'marked'

import docs                from '../../docs.json'

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

class FAQpage extends Component {

  constructor (props) {
    super(props)

    this.state = {
      questions: null
    }

    this.setQuestions = this.setQuestions.bind(this)
  }

  componentWillMount() {
    this.setQuestions()
  }

  setQuestions() {
    let questions = []
    let markdown = docs['faqs'].markdown
    let markdownParts = markdown.split(/### (.*)/g)
    markdownParts.splice(0, 1)

    for (let i = 0; i < markdownParts.length; i += 2) {
      questions.push({
        question: markdownParts[i],
        answer: marked(markdownParts[i+1])
      })
    }

    this.setState({questions})
  }

  render() {
    const {questions} = this.state

    return (
      <DocumentTitle title="Blockstack - FAQ ">
        <div>
          <div className='sidebar-wrapper'>
            <div className="pull-left faq-sidebar">
              <div className="sidebar-logo">
                <Link className="navbar-brand brand-logo" to="/">
                  <img src="/images/logos/blockstack-logo-landscape.svg" />
                </Link>
              </div>
              <div className="list-group">
                <h5 className="list-group-header">Frequently Asked Questions</h5>
                { questions.map((faq, index) => {
                  const refLink = faq.question.toLowerCase().split(' ').join('_');
                  return (
                    <Link key={index}
                          href={`/faq/#${refLink}`}
                          className="list-group-item">
                      {faq.question}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="sidebar-content-wrapper">
            <section>
              {questions.map((faq, index) => {
                const refLink = faq.question.toLowerCase().split(' ').join('_');
                return (
                  <div key={index} id={`${refLink}`}
                       className="container-fluid col-centered segment-zone">
                    <h4>{faq.question}</h4>
                    <div dangerouslySetInnerHTML={{
                      __html: faq.answer
                    }}></div>
                  </div>
                )
              })}
            </section>
            <Footer />
          </div>
        </div>
      </DocumentTitle>
    );
  }

}

export default FAQpage
