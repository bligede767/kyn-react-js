import React from 'react'

export default function ModalButton(props) {
    return (
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${props.target}`}>
            {props.text}
        </button>
    )
}
