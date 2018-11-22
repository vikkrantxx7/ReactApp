import React from 'react'
import PropTypes from 'prop-types'
import escapeRegex from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'

class ListContacts extends React.Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }
    state = {
        query: ''
    }
    updateQuery = (query) => {
        this.setState({query: query.trim()})
    }
    clearQuery() {
        this.setState({query: ''})
    }
    render() {
        const {onDeleteContact, contacts} = this.props
        const {query} = this.state
        let filteredContacts
        if(query) {
            let regEx = new RegExp(escapeRegex(query),'i')
            filteredContacts = contacts.filter(function(contact){
                return contact.name.match(regEx)
            }).sort(sortBy('name'))
        } else {
            filteredContacts = contacts.sort(sortBy('name'))
        }
        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input className='search-contacts' type='text' placeholder='Search Contacts' value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
                    <Link to='/create' className='add-contact'>Add Contact</Link>
                </div>
                {filteredContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                        <span>Now showing {filteredContacts.length} of {contacts.length}</span>
                        <button onClick={() => this.clearQuery()}>Show All</button>
                    </div>
                )}
                <ol className='contact-list'>
                    {filteredContacts.map((contact) => {
                        return (<li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{backgroundImage: `url(${contact.avatarURL})`}}/>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(contact)} className='contact-remove'>Remove</button>
                        </li>);
                    })}
                </ol>
            </div>
        )
    }
}

export default ListContacts