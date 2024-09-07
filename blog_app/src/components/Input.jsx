import React from 'react'
import '../assets/styles/input.css';
const Input = (
    {
        focus = false,
        required = false,
        labelColumn = false,
        animate = false,
        labelClassName = '',
        type = 'text',
        labelText = 'form label',
        name,
        id, ref=null,
        active = '',
        placeholder = 'form placeholder',
        className = '',
        value,
        onChange = () => { },
        size = 'md',
        onBlur = () => { },
        onfocus = () => { },
        inputMode = '',
    }
) => {
    return (
        <>
            {animate ?
                <div className='form-outline mb-3'>
                    <input
                        autoFocus={focus}
                        required={required}
                        type={type}
                        id={id}
                        name={name}
                        onChange={onChange}
                        onBlur={
                            (e) => {
                                e.currentTarget.value == '' || null ?
                                    e.currentTarget.classList.remove('active') :
                                    e.currentTarget.classList.add('active')
                            }
                        }
                        // onBlur={onBlur}
                        onFocus={onfocus}
                        ref={ref}
                        inputMode={inputMode}
                        placeholder={placeholder}
                        value={value}
                        className={`form-control my-0 form-control-${size + className + ' ' + active}`}
                    />
                    <label htmlFor={id} className='form-label'>
                        {labelText}
                    </label>
                </div> : labelColumn ?
                    <div className='form-group mb-3'>
                        <label htmlFor={id} className={`form-label ${labelClassName}`}>
                            {labelText}
                        </label>
                        <input
                            required={required}
                            type={type}
                            id={id}
                            name={name}
                            onChange={onChange}
                            onBlur={
                                (e) => {
                                    e.currentTarget.value == '' || null ?
                                        e.currentTarget.classList.remove('active') :
                                        e.currentTarget.classList.add('active')
                                }
                            }
                            ref={ref}
                            placeholder={placeholder}
                            value={value}
                            inputMode={inputMode}
                            className={`form-control my-0 form-control-${size + className + ' ' + active}`}
                        />
                    </div> :
                    <div className='input-group mb-3'>
                        <label htmlFor={id} className={`form-label input-group-text border-0 ${labelClassName}`}>
                            {labelText}
                        </label>
                        <input
                            required={required}
                            type={type}
                            id={id}
                            name={name}
                            onChange={onChange}
                            onBlur={
                                (e) => {
                                    e.currentTarget.value == '' || null ?
                                        e.currentTarget.classList.remove('active') :
                                        e.currentTarget.classList.add('active')
                                }
                            }
                            ref={ref}
                            inputMode={inputMode}
                            placeholder={placeholder}
                            value={value} className={`form-control my-0 form-control-${size + className + ' ' + active}`}
                        />
                    </div>}
        </>
    )
}
export default Input
