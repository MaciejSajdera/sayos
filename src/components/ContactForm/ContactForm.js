import React from 'react';
import { navigate } from 'gatsby-link'
import { Location } from '@reach/router'

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function ContactForm() {

  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const form = e.target
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': form.getAttribute('name'),
          ...state,
        }),
      })
        .then(() => navigate(form.getAttribute('action')))
        .catch((error) => alert(error))
    }


    return (
          <div className="contact-form">
                <h3>Napisz do nas</h3>
            
                <Location>
                   {({ location }) => {
                     console.log(location.pathname.toString())

                     let currentPath = location.pathname.toString();

                     let currentLanguageEnglish = currentPath.includes("/en");

                      if ( currentLanguageEnglish ) {

                        let actionPath = "/thank-you";

                        return (

                                <form
                                    name="contact"
                                    method="post"
                                    action={actionPath}
                                    data-netlify="true"
                                    data-netlify-honeypot="bot-field"
                                    onSubmit={handleSubmit}
                                  >
                                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                                    <input type="hidden" name="form-name" value="contact" />
                                    <p hidden>
                                    
                                        Don’t fill this out: <input name="bot-field" onChange={handleChange} />
                                      
                                    </p>
                                    <p>
                                    
                                        
                                        <input type="text" name="name" placeholder="Your name:" onChange={handleChange} />
                                      
                                    </p>
                                    <p>
                                    
                                        
                                        <input type="text" name="surname" placeholder="Your surname:" onChange={handleChange} />
                                      
                                    </p>
                                    <p>
                                    
                                        
                                        <input type="email" name="email" placeholder="E-mail:" onChange={handleChange} />
                                      
                                    </p>
                                    <p className={`text-area-paragraph`}>
                                    
                                        
                                        <textarea name="message" placeholder="Message:" onChange={handleChange} />
                                      
                                    </p>
                                    <p>
                                      <button type="submit">Send</button>
                                    </p>
                                </form>
                        )
                      } else {

                        let actionPath = "/dziekujemy";

                        return (
                                <form
                                    name="contact"
                                    method="post"
                                    action={actionPath}
                                    data-netlify="true"
                                    data-netlify-honeypot="bot-field"
                                    onSubmit={handleSubmit}
                                  >
                                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                                    <input type="hidden" name="form-name" value="contact" />
                                    <p hidden>
                                    
                                        Don’t fill this out: <input name="bot-field" onChange={handleChange} />
                                      
                                    </p>
                                    <p>
                                    
                                        
                                        <input type="text" name="name" placeholder="Your name:" onChange={handleChange} />
                                      
                                    </p>
                                    <p>
                                    
                                        
                                        <input type="text" name="surname" placeholder="Your surname:" onChange={handleChange} />
                                      
                                    </p>
                                    <p>
                                    
                                        
                                        <input type="email" name="email" placeholder="E-mail:" onChange={handleChange} />
                                      
                                    </p>
                                    <p className={`text-area-paragraph`}>
                                    
                                        
                                        <textarea name="message" placeholder="Message:" onChange={handleChange} />
                                      
                                    </p>
                                    <p>
                                      <button type="submit">Send</button>
                                    </p>
                                </form>
                        )
                      } 
                    }}
                </Location>

            
          </div>
    )
}
