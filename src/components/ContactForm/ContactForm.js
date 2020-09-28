import React from 'react';
import { navigate } from 'gatsby-link'
import { Location } from '@reach/router'
import { RiArrowGoBackFill } from 'react-icons/ri';
// import { useForm } from "react-hook-form";

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

const ContactForm = ({ handleContactFormToggle }) => {

  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const form = e.target
      console.log(form);
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

    // const { register, handleSubmit, watch, errors } = useForm();

    return (
          <div className="contact-form">
                
                <div className="form-title-wrapper">
                  <h3>Napisz do nas! </h3>
                  <span className="close-contact-form" onClick={() => {handleContactFormToggle()}}>
                      <RiArrowGoBackFill />
                  </span>
                 </div>
                  
            
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
                                    // action={actionPath}
                                    data-netlify="true"
                                    data-netlify-honeypot="bot-field"
                                    onSubmit={handleSubmit}
                                  >
                                    {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                                    <input type="hidden" name="form-name" value="contact" />
                                    <p hidden>
                                    
                                        Don’t fill this out: <input name="bot-field" onChange={handleChange} />
                                      
                                    </p>

                                    <select name="cars" id="cars">
                                      <option value="volvo">Volvo</option>
                                      <option value="saab">Saab</option>
                                      <option value="mercedes">Mercedes</option>
                                      <option value="audi">Audi</option>
                                    </select>

                                    <p>
                                  
                                        <input type="text" name="name" placeholder="Your name:" onChange={handleChange} />
                                      
                                    </p>
                                    <p>
                                    
                                        <input type="text" name="surname" placeholder="Your surname:" onChange={handleChange} />
                                      
                                    </p>
                                    <p>
                                    
                                        <input type="email" name="email" placeholder="E-mail:" required onChange={handleChange} />
                                    </p>
                                    <p className={`text-area-paragraph`}>
                                    
                                        
                                        <textarea name="message" placeholder="Message:" required onChange={handleChange} />
                                      
                                    </p>
                                    <p>
                                      <button type="submit">WYŚLIJ WIADOMOŚĆ</button>
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


                                    <select name="cars" id="cars" onChange={handleChange}>
                                      <option value="volvo">Volvo</option>
                                      <option value="saab">Saab</option>
                                      <option value="mercedes">Mercedes</option>
                                      <option value="audi">Audi</option>
                                    </select>


                                    <p>
                                    
                                        
                                        <input type="text" name="name" placeholder="Your name:" onChange={handleChange} />
                                      
                                    </p>
                                    <p>
                                    
                                        
                                        <input type="text" name="surname" placeholder="Your surname:" onChange={handleChange} />
                                      
                                    </p>
                                    <p>
                                    
                                        
                                        <input type="email" name="email" placeholder="E-mail:" required onChange={handleChange} />
                                      
                                    </p>
                                    <p className={`text-area-paragraph`}>
                                    
                                        
                                        <textarea name="message" placeholder="Message:" required onChange={handleChange} />
                                      
                                    </p>
                                    <p>
                                    <button type="submit">WYŚLIJ WIADOMOŚĆ</button>
                                    </p>
                                </form>
                        )
                      } 
                    }}
                </Location>

            
          </div>
    )
}

export default ContactForm