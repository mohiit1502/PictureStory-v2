#!/bin/bash

# function string_replace {
#     echo "${1//\*/$2}"
# }

createStatelessComponent() {
    COMPONENT_NAME=$1
    # SCRIPT_PATH=`pwd`
    cd ..
    COMPONENT_PATH=`find -type d -name 'components'`
    echo "Creating Stateless Component $COMPONENT_NAME"
    cd $COMPONENT_PATH
    mkdir $COMPONENT_NAME
    cd $COMPONENT_NAME
    
    touch test.js
    touch _base.scss
    touch index.jsx

    cat <<-EOF > index.jsx
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const $COMPONENT_NAME = ({
    className,
    text
}) => {
    const classes = classNames('c-$COMPONENT_NAME', {
        // 'c--modifier': bool ? true : false
    }, className)

    return (
        <div className={classes}>
            I am an example! {text}
        </div>
    )
}


$COMPONENT_NAME.propTypes = {
    /**
     * PropTypes comments are REQUIRED for components to be included
     * in the styleguide
     */
    text: PropTypes.string.isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

}

export default $COMPONENT_NAME
EOF
    cat <<-EOF > _base.scss
.c-$COMPONENT_NAME {
    // Root Class. Contains all core styles, typically for the component's
    // wrapper element.
}
EOF

}

createStateFulComponent() {
    COMPONENT_NAME=$1
    echo "Creating Stateful Component $COMPONENT_NAME"
    cd ..
    COMPONENT_PATH=`find -type d -name 'components'`
    cd $COMPONENT_PATH
    mkdir $COMPONENT_NAME
    cd $COMPONENT_NAME
    
    touch test.js
    touch _base.scss
    touch index.jsx

    cat <<-EOF > index.jsx
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class $COMPONENT_NAME extends React.Component {

    render() {
        const {
            className,
            text
        } = this.props

        const classes = classNames('c-$COMPONENT_NAME', {
            // 'c--modifier': bool ? true : false
        }, className)

        return (
            <div className={classes}>
                I am an example! {text}
            </div>
        )
    }
}


$COMPONENT_NAME.propTypes = {
    /**
     * PropTypes comments are REQUIRED for components to be included
     * in the styleguide
     */
    text: PropTypes.string.isRequired,

    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

}

export default $COMPONENT_NAME
EOF

    cat <<-EOF > _base.scss
.c-$COMPONENT_NAME {
    // Root Class. Contains all core styles, typically for the component's
    // wrapper element.
}
EOF
}

NO_ARGS='true'
read -p "Please Enter Component name: " COMPONENT_NAME

while getopts s option
do
    NO_ARGS='false'
    echo "Generating component now...."
    case $option in 
    s)
        createStateFulComponent $COMPONENT_NAME
        ;;
    [?])
        echo "Usage: $0 [-s]"
		exit 1
        ;;
    esac
done

if [ $NO_ARGS == 'true' ]; then
    createStatelessComponent $COMPONENT_NAME
fi
