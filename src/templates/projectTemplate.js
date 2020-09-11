import React, { Component } from 'react'

export default class ProjectTemplate extends Component {
    render() {

        const { myProjectData } = this.props.pageContext;


        return (
     <div>
        strona projektu: {myProjectData.slug}
      </div>
        )
    }
}

