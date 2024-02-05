import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    action: false,
    open: false,
    message: 'Note archived',
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
    },
    variant: 'alert',
    alert: {
        color: 'primary',
        variant: 'filled'
    },
    transition: 'Fade',
    close: true,
    maxStack: 3,
    dense: false,
    iconVariant: 'hide',
    actionButton: false
};

// ==============================|| SLICE - SNACKBAR ||============================== //

const snackbar = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        openSnackbar(state, action) {
            const {  message, anchorOrigin, variant, alert, transition,  actionButton } = action.payload;

            state.action = !state.action;
            state.open = true;
            state.message = message || initialState.message;
            state.anchorOrigin = anchorOrigin || initialState.anchorOrigin;
            state.variant = variant || initialState.variant;
            state.alert = {
                color: alert?.color || initialState.alert.color,
                variant: alert?.variant || initialState.alert.variant
            };
            state.transition = transition || initialState.transition;
            state.close = initialState.close;
            state.actionButton = actionButton || initialState.actionButton;
        },

        closeSnackbar(state) {
            state.open = false;
        },

        handlerDense(state, action) {
            const { dense } = action.payload;
            state.dense = dense;
        },

        handlerIncrease(state, action) {
            const { maxStack } = action.payload;
            state.maxStack = maxStack;
        },

        handlerIconVariants(state, action) {
            const { iconVariant } = action.payload;
            state.iconVariant = iconVariant;
        }
    }
});

export default snackbar.reducer;

export const { closeSnackbar, openSnackbar, handlerDense, handlerIconVariants, handlerIncrease } = snackbar.actions;
