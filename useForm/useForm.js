import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    const [ formValidation, setFormValidation ] = useState ({}); // Iniciamos con un objeto vacio para las validaciones

    useEffect(() => {
        createValidators ();
    }, [ formState ]); // Cada vez que formState cambia, llama a la función createValidators

    useEffect(() => {
        setFormState ( initialForm );   
    }, [ initialForm ]); // Para que cambie de nota cuando cambia la nota activa (al pinchar en el menu)
    
    
    const isFormValid = useMemo ( () => {
        for ( const formValue of Object.keys ( formValidation ) ) {
            if ( formValidation [ formValue ] !== null ) return false;
        }
        return true;
    }, [ formValidation ])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    };

    const onResetForm = () => {
        setFormState( initialForm );
    };

    const createValidators = () =>{

        const formCheckedValues = {}; 

        for ( const formField of Object.keys ( formValidations ) ) {
            const [ fn, errorMessage ] = formValidations [ formField ]; // Obtenemos la función y el mensaje del error
            
            formCheckedValues [`${ formField }Valid`] = fn ( formState [formField] ) ? null : errorMessage
        
        };

        setFormValidation ( formCheckedValues );
    };
    

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    };
};