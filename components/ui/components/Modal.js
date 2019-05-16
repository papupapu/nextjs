import React from 'react';
import PropTypes from 'prop-types';

// import Close from '../icons/Close';

const propTypes = {
  type: PropTypes.string,
  data: PropTypes.instanceOf(Object),
  close: PropTypes.func,
};

const defaultProps = {
  type: '',
  data: {},
  close: null,
};

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close(event) {
    const { close } = this.props;
    event.preventDefault();
    close(event);
  }

  modalBody() {
    const { type, data } = this.props;
    const title = data && data.title
      ? (
        <h2>
          {data.title}
        </h2>
      )
      : (
        <h2>
          Ops... no data here...
        </h2>
      );
    const subtitle = data && data.subtitle
      ? (
        <p>
          {data.subtitle}
        </p>
      )
      : null;
    let username;
    let useremail;
    let userphone;
    let usermessage;
    switch (type) {
      case 'login':
        return (
          <div className="format">
            <h1>
              login modal
            </h1>
            <div className="content">
              <p>
                loginmodal body
              </p>
            </div>
          </div>
        );
      case 'addBookmark':
        return (
          <div className="format">
            <h1>
              Add to favorites
            </h1>
            <div className="content">
              {title}
              {subtitle}
            </div>
          </div>
        );
      case 'sendMail':
        return (
          <div className="format">
            <h1>
              Send this article via mail
            </h1>
            <div className="content">
              {title}
              {subtitle}
            </div>
          </div>
        );
      case 'genericMail':
        username = data && data.name
          ? (
            <p>
              nome:
              {' '}
              {data.name}
            </p>
          ) : (
            <p>
              <em>
                Name missing!!!
              </em>
            </p>
          );
        useremail = data && data.email
          ? (
            <p>
              email:
              {' '}
              {data.email}
            </p>
          ) : (
            <p>
              <em>
                Email missing!!!
              </em>
            </p>
          );
        userphone = data && data.phone
          ? (
            <p>
              telefono:
              {' '}
              {data.phone}
            </p>
          ) : null;
        usermessage = data && data.message
          ? (
            <p>
              messaggio:
              <br />
              {data.message}
            </p>
          ) : null;
        return (
          <div className="format">
            <h1>
              Leads: check data
            </h1>
            <div className="content">
              {username}
              {useremail}
              {userphone}
              {usermessage}
            </div>
          </div>
        );
      default:
        return (
          <div className="format">
            <h1>
              Just a generic message...
            </h1>
            <div className="content">
              <h2>
                The handle you clicked had no action assigned
              </h2>
              <p>
                Not much I can do without actions... maybe I can sing you a song...
              </p>
              <p className="song">
                <em>
                  Desmond has a barrow in the marketplace
                  Molly is the singer in a band
                  Desmond says to Molly girl I like your face
                  And Molly says this as she takes him by the hand
                </em>
              </p>
              <p className="song">
                <em>
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                </em>
              </p>
              <p className="song">
                <em>
                  Desmond takes a trolley to the jeweler&#39;s store
                  Buys a twenty carat golden ring
                  Takes it back to Molly waiting at the door
                  And as he gives it to her she begins to sing
                </em>
              </p>
              <p className="song">
                <em>
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                </em>
              </p>
              <p className="song">
                <em>
                  In a couple of years they have built
                  A home sweet home
                  With a couple of kids running in the yard
                  Of Desmond and Molly Jones
                </em>
              </p>
              <p className="song">
                <em>
                  Happy ever after in the market place
                  Desmond lets the children lend a hand
                  Molly stays at home and does her pretty face
                  And in the evening she still sings it with the band
                </em>
              </p>
              <p className="song">
                <em>
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                </em>
              </p>
              <p className="song">
                <em>
                  In a couple of years they have built
                  A home sweet home
                  With a couple of kids running in the yard
                  Of Desmond and Molly Jones
                </em>
              </p>
              <p className="song">
                <em>
                  Happy ever after in the market place
                  Molly lets the children lend a hand
                  Desmond stays at home and does his pretty face
                  And in the evening he&#39;s a singer with the band
                </em>
              </p>
              <p className="song">
                <em>
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                  Ob la di ob la da life goes on bra
                  La la how the life goes on
                </em>
              </p>
              <p className="song">
                <em>
                  And if you want some fun sing ob la di bla da
                </em>
              </p>
            </div>
          </div>
        );
    }
  }

  render() {
    /*
    const close = (
      <button type="button" className="modal_handle" onClick={this.close}>
        {Close()}
      </button>
    );
    */
    const body = this.modalBody();
    return (
      <div ref={(modal) => { this.modal = modal; }} className="modal">
        {/* close */}
        {body}
      </div>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
export default Modal;
