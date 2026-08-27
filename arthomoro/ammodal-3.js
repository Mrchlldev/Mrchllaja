/*!
 * =========================================================
 * AMModal v3.0.0
 * Arthomoro Modal Library
 *
 * Single Library
 * CSS + JavaScript
 *
 * Features:
 * - Center / Bottom position
 * - Responsive mobile bottom sheet
 * - Custom borderRadius
 * - Forms
 * - Select
 * - Checkbox
 * - Radio
 * - Switch
 * - Toast
 * - Loading
 * - Async callbacks
 *
 * CDN:
 * https://cdn.jsdelivr.net/gh/Mrchlldev/Mrchllaja@main/arthomoro/ammodal-3.js
 * =========================================================
 */

(function (window, document) {

    "use strict";


    /* =========================================================
       CSS
    ========================================================= */

    const CSS = `

/* =========================================================
   AMMODAL v3
========================================================= */

:root {

    --am-modal-bg:
        var(--contentB, #ffffff);

    --am-modal-border:
        var(--contentL, #e5e7eb);

    --am-modal-primary:
        var(--linkC, #2563eb);

    --am-modal-text:
        var(--textC, #111827);

    --am-modal-muted:
        #64748b;

    --am-modal-radius:
        22px;

    --am-modal-shadow:
        0 24px 70px rgba(0,0,0,.18),
        0 8px 25px rgba(0,0,0,.08);
}


/* =========================================================
   BOX SIZING
========================================================= */

.am-modal-overlay *,
.am-modal-overlay,
.am-modal-toast-container *,
.am-modal-toast-container {

    box-sizing:
        border-box;
}


/* =========================================================
   OVERLAY
========================================================= */

.am-modal-overlay {

    position:
        fixed;

    inset:
        0;

    z-index:
        999999;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    padding:
        18px;

    background:
        rgba(15,23,42,.30);

    backdrop-filter:
        blur(7px);

    -webkit-backdrop-filter:
        blur(7px);

    opacity:
        0;

    visibility:
        hidden;

    pointer-events:
        none;

    transition:
        opacity .25s ease,
        visibility .25s ease;
}


.am-modal-overlay.am-modal-show {

    opacity:
        1;

    visibility:
        visible;

    pointer-events:
        auto;
}


/* =========================================================
   MODAL
========================================================= */

.am-modal {

    --am-modal-instance-radius:
        var(--am-modal-radius);

    position:
        relative;

    width:
        min(100%,520px);

    max-width:
        100%;

    max-height:
        calc(100dvh - 36px);

    margin:
        0;

    display:
        flex;

    flex-direction:
        column;

    color:
        var(--am-modal-text);

    background:
        var(--am-modal-bg);

    border:
        1px solid
        var(--am-modal-border);

    border-radius:
        var(--am-modal-instance-radius);

    box-shadow:
        var(--am-modal-shadow);

    overflow:
        hidden;

    opacity:
        0;

    transform:
        translateY(20px)
        scale(.96);

    transition:
        transform .30s cubic-bezier(.22,1,.36,1),
        opacity .22s ease;
}


.am-modal-overlay.am-modal-show
.am-modal {

    opacity:
        1;

    transform:
        translateY(0)
        scale(1);
}


/* =========================================================
   CENTER
========================================================= */

.am-modal.am-modal-center {

    align-self:
        center;

    margin:
        auto;
}


/* =========================================================
   BOTTOM
========================================================= */

.am-modal.am-modal-bottom {

    align-self:
        flex-end;

    margin-top:
        auto;

    width:
        min(100%,600px);

    transform:
        translateY(105%);
}


.am-modal-overlay.am-modal-show
.am-modal.am-modal-bottom {

    transform:
        translateY(0);
}


/* =========================================================
   HANDLE
========================================================= */

.am-modal-handle {

    width:
        42px;

    height:
        4px;

    margin:
        10px auto 0;

    border-radius:
        99px;

    background:
        rgba(127,127,127,.28);

    display:
        none;

    flex:
        0 0 auto;
}


.am-modal-bottom
.am-modal-handle {

    display:
        block;
}


/* =========================================================
   HEADER
========================================================= */

.am-modal-header {

    display:
        flex;

    align-items:
        center;

    gap:
        14px;

    padding:
        20px 20px 16px;

    border-bottom:
        1px solid
        var(--am-modal-border);
}


.am-modal-header-content {

    min-width:
        0;

    flex:
        1;
}


.am-modal-title {

    margin:
        0;

    color:
        var(--am-modal-text);

    font-size:
        21px;

    font-weight:
        700;

    line-height:
        1.25;
}


.am-modal-subtitle {

    margin:
        5px 0 0;

    color:
        var(--am-modal-muted);

    font-size:
        13px;

    line-height:
        1.5;
}


/* =========================================================
   CLOSE
========================================================= */

.am-modal-close {

    width:
        38px;

    height:
        38px;

    flex:
        0 0 auto;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    padding:
        0;

    border:
        0;

    border-radius:
        50%;

    color:
        var(--am-modal-text);

    background:
        transparent;

    font-family:
        inherit;

    font-size:
        25px;

    cursor:
        pointer;

    transition:
        background .18s ease,
        transform .18s ease;
}


.am-modal-close:hover {

    background:
        rgba(127,127,127,.10);
}


.am-modal-close:active {

    transform:
        scale(.88);
}


/* =========================================================
   ICON
========================================================= */

.am-modal-icon {

    width:
        46px;

    height:
        46px;

    flex:
        0 0 auto;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    border-radius:
        15px;

    font-size:
        22px;

    font-weight:
        700;
}


.am-modal-icon-success {

    color:
        #16a34a;

    background:
        rgba(34,197,94,.12);
}


.am-modal-icon-error {

    color:
        #dc2626;

    background:
        rgba(239,68,68,.12);
}


.am-modal-icon-warning {

    color:
        #d97706;

    background:
        rgba(245,158,11,.14);
}


.am-modal-icon-info {

    color:
        #2563eb;

    background:
        rgba(59,130,246,.12);
}


.am-modal-icon-question {

    color:
        #7c3aed;

    background:
        rgba(139,92,246,.12);
}


/* =========================================================
   BODY
========================================================= */

.am-modal-body {

    flex:
        1;

    min-height:
        0;

    padding:
        20px;

    overflow-y:
        auto;

    overscroll-behavior:
        contain;

    -webkit-overflow-scrolling:
        touch;
}


.am-modal-message {

    margin:
        0;

    color:
        var(--am-modal-text);

    font-size:
        15px;

    line-height:
        1.65;
}


.am-modal-html {

    width:
        100%;
}


/* =========================================================
   FOOTER
========================================================= */

.am-modal-footer {

    display:
        flex;

    align-items:
        center;

    justify-content:
        flex-end;

    gap:
        10px;

    padding:
        16px 20px 20px;

    border-top:
        1px solid
        var(--am-modal-border);
}


.am-modal-footer-center {

    justify-content:
        center;
}


.am-modal-footer-between {

    justify-content:
        space-between;
}


/* =========================================================
   BUTTON
========================================================= */

.am-modal-btn {

    min-height:
        43px;

    display:
        inline-flex;

    align-items:
        center;

    justify-content:
        center;

    gap:
        8px;

    padding:
        0 18px;

    border:
        1px solid transparent;

    border-radius:
        12px;

    outline:
        none;

    font-family:
        inherit;

    font-size:
        14px;

    font-weight:
        600;

    cursor:
        pointer;

    user-select:
        none;

    transition:
        transform .15s ease,
        opacity .15s ease,
        background .15s ease,
        border-color .15s ease;
}


.am-modal-btn:hover {

    opacity:
        .9;
}


.am-modal-btn:active {

    transform:
        scale(.96);
}


.am-modal-btn:disabled {

    opacity:
        .55;

    cursor:
        not-allowed;

    transform:
        none;
}


.am-modal-btn-primary {

    color:
        #fff;

    background:
        var(--am-modal-primary);
}


.am-modal-btn-secondary {

    color:
        var(--am-modal-text);

    background:
        rgba(127,127,127,.10);

    border-color:
        var(--am-modal-border);
}


.am-modal-btn-danger {

    color:
        #fff;

    background:
        #dc2626;
}


.am-modal-btn-success {

    color:
        #fff;

    background:
        #16a34a;
}


.am-modal-btn-warning {

    color:
        #fff;

    background:
        #d97706;
}


.am-modal-btn-info {

    color:
        #fff;

    background:
        #2563eb;
}


.am-modal-btn-outline {

    color:
        var(--am-modal-primary);

    background:
        transparent;

    border-color:
        var(--am-modal-primary);
}


.am-modal-btn-ghost {

    color:
        var(--am-modal-text);

    background:
        transparent;
}


/* =========================================================
   LOADING
========================================================= */

.am-modal-loading {

    width:
        17px;

    height:
        17px;

    border:
        2px solid currentColor;

    border-right-color:
        transparent;

    border-radius:
        50%;

    animation:
        am-modal-spin .7s linear infinite;
}


@keyframes am-modal-spin {

    to {

        transform:
            rotate(360deg);
    }
}


/* =========================================================
   FORM
========================================================= */

.am-modal-form {

    display:
        flex;

    flex-direction:
        column;

    gap:
        17px;
}


.am-modal-field {

    display:
        flex;

    flex-direction:
        column;

    gap:
        7px;
}


.am-modal-label {

    display:
        flex;

    align-items:
        center;

    gap:
        4px;

    color:
        var(--am-modal-text);

    font-size:
        13px;

    font-weight:
        600;
}


.am-modal-required {

    color:
        #ef4444;
}


.am-modal-help {

    margin:
        -2px 0 0;

    color:
        var(--am-modal-muted);

    font-size:
        12px;

    line-height:
        1.45;
}


/* =========================================================
   INPUT
========================================================= */

.am-modal-input,
.am-modal-textarea {

    width:
        100%;

    color:
        var(--am-modal-text);

    background:
        var(--am-modal-bg);

    border:
        1px solid
        var(--am-modal-border);

    border-radius:
        12px;

    outline:
        none;

    font-family:
        inherit;

    font-size:
        14px;

    transition:
        border-color .18s ease,
        box-shadow .18s ease;
}


.am-modal-input {

    height:
        45px;

    padding:
        0 13px;
}


.am-modal-textarea {

    min-height:
        110px;

    padding:
        12px 13px;

    resize:
        vertical;
}


.am-modal-input:focus,
.am-modal-textarea:focus {

    border-color:
        var(--am-modal-primary);

    box-shadow:
        0 0 0 3px
        color-mix(
            in srgb,
            var(--am-modal-primary) 15%,
            transparent
        );
}


/* =========================================================
   SELECT
========================================================= */

.am-modal-select-wrap {

    position:
        relative;
}


.am-modal-select-button {

    width:
        100%;

    height:
        45px;

    display:
        flex;

    align-items:
        center;

    justify-content:
        space-between;

    gap:
        10px;

    padding:
        0 13px;

    border:
        1px solid
        var(--am-modal-border);

    border-radius:
        12px;

    color:
        var(--am-modal-text);

    background:
        var(--am-modal-bg);

    font-family:
        inherit;

    font-size:
        14px;

    cursor:
        pointer;

    text-align:
        left;
}


.am-modal-select-button:hover {

    border-color:
        var(--am-modal-primary);
}


.am-modal-select-arrow {

    width:
        8px;

    height:
        8px;

    border-right:
        2px solid currentColor;

    border-bottom:
        2px solid currentColor;

    transform:
        rotate(45deg)
        translateY(-2px);

    transition:
        transform .2s ease;
}


.am-modal-select-wrap.open
.am-modal-select-arrow {

    transform:
        rotate(225deg)
        translateY(-2px);
}


.am-modal-select-menu {

    position:
        absolute;

    z-index:
        30;

    left:
        0;

    right:
        0;

    top:
        calc(100% + 6px);

    max-height:
        220px;

    padding:
        6px;

    overflow-y:
        auto;

    background:
        var(--am-modal-bg);

    border:
        1px solid
        var(--am-modal-border);

    border-radius:
        13px;

    box-shadow:
        0 15px 35px rgba(0,0,0,.14);

    opacity:
        0;

    visibility:
        hidden;

    transform:
        translateY(-5px)
        scale(.98);

    transition:
        opacity .15s ease,
        visibility .15s ease,
        transform .15s ease;
}


.am-modal-select-wrap.open
.am-modal-select-menu {

    opacity:
        1;

    visibility:
        visible;

    transform:
        translateY(0)
        scale(1);
}


.am-modal-select-option {

    width:
        100%;

    display:
        flex;

    align-items:
        center;

    padding:
        11px 12px;

    border:
        0;

    border-radius:
        9px;

    color:
        var(--am-modal-text);

    background:
        transparent;

    font-family:
        inherit;

    font-size:
        14px;

    cursor:
        pointer;

    text-align:
        left;
}


.am-modal-select-option:hover {

    background:
        rgba(127,127,127,.09);
}


.am-modal-select-option.selected {

    color:
        var(--am-modal-primary);

    background:
        color-mix(
            in srgb,
            var(--am-modal-primary) 10%,
            transparent
        );

    font-weight:
        600;
}


/* =========================================================
   CHECKBOX
========================================================= */

.am-modal-check {

    display:
        flex;

    align-items:
        flex-start;

    gap:
        10px;

    cursor:
        pointer;
}


.am-modal-check-input {

    position:
        absolute;

    opacity:
        0;

    pointer-events:
        none;
}


.am-modal-check-box {

    width:
        19px;

    height:
        19px;

    flex:
        0 0 19px;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    margin-top:
        1px;

    border:
        1.5px solid
        var(--am-modal-border);

    border-radius:
        6px;

    background:
        var(--am-modal-bg);

    transition:
        background .18s ease,
        border-color .18s ease;
}


.am-modal-check-input:checked
+ .am-modal-check-box {

    background:
        var(--am-modal-primary);

    border-color:
        var(--am-modal-primary);
}


.am-modal-check-box::after {

    content:
        "";

    width:
        5px;

    height:
        9px;

    border-right:
        2px solid #fff;

    border-bottom:
        2px solid #fff;

    transform:
        rotate(45deg)
        scale(0);

    transition:
        transform .15s ease;
}


.am-modal-check-input:checked
+ .am-modal-check-box::after {

    transform:
        rotate(45deg)
        scale(1);
}


.am-modal-check-content {

    display:
        flex;

    flex-direction:
        column;

    gap:
        3px;
}


.am-modal-check-title {

    color:
        var(--am-modal-text);

    font-size:
        14px;

    font-weight:
        600;
}


.am-modal-check-desc {

    color:
        var(--am-modal-muted);

    font-size:
        12px;

    line-height:
        1.4;
}


/* =========================================================
   RADIO
========================================================= */

.am-modal-radio-group {

    display:
        flex;

    flex-direction:
        column;

    gap:
        9px;
}


.am-modal-radio {

    position:
        relative;

    display:
        flex;

    align-items:
        center;

    gap:
        10px;

    padding:
        11px 12px;

    border:
        1px solid
        var(--am-modal-border);

    border-radius:
        12px;

    cursor:
        pointer;

    transition:
        border-color .18s ease,
        background .18s ease;
}


.am-modal-radio:hover {

    background:
        rgba(127,127,127,.05);
}


.am-modal-radio-input {

    position:
        absolute;

    opacity:
        0;

    pointer-events:
        none;
}


.am-modal-radio-circle {

    width:
        19px;

    height:
        19px;

    flex:
        0 0 19px;

    display:
        flex;

    align-items:
        center;

    justify-content:
        center;

    border:
        1.5px solid
        var(--am-modal-border);

    border-radius:
        50%;
}


.am-modal-radio-circle::after {

    content:
        "";

    width:
        9px;

    height:
        9px;

    border-radius:
        50%;

    background:
        var(--am-modal-primary);

    transform:
        scale(0);

    transition:
        transform .15s ease;
}


.am-modal-radio-input:checked
+ .am-modal-radio-circle {

    border-color:
        var(--am-modal-primary);
}


.am-modal-radio-input:checked
+ .am-modal-radio-circle::after {

    transform:
        scale(1);
}


.am-modal-radio-input:checked
~ .am-modal-radio-text {

    color:
        var(--am-modal-primary);

    font-weight:
        600;
}


/* =========================================================
   SWITCH
========================================================= */

.am-modal-switch {

    display:
        flex;

    align-items:
        center;

    justify-content:
        space-between;

    gap:
        15px;

    cursor:
        pointer;
}


.am-modal-switch-input {

    position:
        absolute;

    opacity:
        0;

    pointer-events:
        none;
}


.am-modal-switch-track {

    width:
        42px;

    height:
        24px;

    position:
        relative;

    flex:
        0 0 auto;

    border-radius:
        999px;

    background:
        rgba(127,127,127,.25);

    transition:
        background .2s ease;
}


.am-modal-switch-track::after {

    content:
        "";

    position:
        absolute;

    top:
        3px;

    left:
        3px;

    width:
        18px;

    height:
        18px;

    border-radius:
        50%;

    background:
        #fff;

    box-shadow:
        0 1px 4px rgba(0,0,0,.18);

    transition:
        transform .2s ease;
}


.am-modal-switch-input:checked
+ .am-modal-switch-track {

    background:
        var(--am-modal-primary);
}


.am-modal-switch-input:checked
+ .am-modal-switch-track::after {

    transform:
        translateX(18px);
}


/* =========================================================
   TOAST
========================================================= */

.am-modal-toast-container {

    position:
        fixed;

    z-index:
        1000000;

    top:
        18px;

    right:
        18px;

    width:
        min(380px,calc(100vw - 36px));

    display:
        flex;

    flex-direction:
        column;

    gap:
        10px;

    pointer-events:
        none;
}


.am-modal-toast {

    display:
        flex;

    align-items:
        center;

    gap:
        11px;

    padding:
        13px 15px;

    color:
        var(--am-modal-text);

    background:
        var(--am-modal-bg);

    border:
        1px solid
        var(--am-modal-border);

    border-radius:
        14px;

    box-shadow:
        var(--am-modal-shadow);

    pointer-events:
        auto;

    animation:
        am-modal-toast-in
        .3s
        cubic-bezier(.22,1,.36,1);
}


@keyframes am-modal-toast-in {

    from {

        opacity:
            0;

        transform:
            translateY(-10px)
            scale(.97);
    }

    to {

        opacity:
            1;

        transform:
            translateY(0)
            scale(1);
    }
}


.am-modal-toast-text {

    flex:
        1;

    font-size:
        13px;

    line-height:
        1.45;
}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width:600px) {

    /*
     * MOBILE DEFAULT:
     * Modal center berubah menjadi bottom.
     *
     * Jadi:
     *
     * AMModal.open()
     *
     * akan tetap memakai position center
     * secara konfigurasi, tetapi tampil
     * sebagai bottom sheet di mobile.
     */

    .am-modal-overlay {

        align-items:
            flex-end;

        padding:
            0;
    }


    .am-modal {

        width:
            100%;

        max-width:
            100%;

        max-height:
            calc(100dvh - 15px);

        margin:
            0;

        border-radius:
            var(--am-modal-instance-radius);
    }


    /*
     * CENTER DI MOBILE
     * Tetap berada di bawah.
     */

    .am-modal.am-modal-center {

        align-self:
            flex-end;

        margin-top:
            auto;

        transform:
            translateY(105%)
            scale(1);
    }


    .am-modal-overlay.am-modal-show
    .am-modal.am-modal-center {

        transform:
            translateY(0)
            scale(1);
    }


    /*
     * BOTTOM DI MOBILE
     */

    .am-modal.am-modal-bottom {

        align-self:
            flex-end;

        margin-top:
            auto;

        transform:
            translateY(105%)
            scale(1);
    }


    .am-modal-overlay.am-modal-show
    .am-modal.am-modal-bottom {

        transform:
            translateY(0)
            scale(1);
    }


    .am-modal-header {

        padding:
            18px 18px 15px;
    }


    .am-modal-body {

        padding:
            18px;
    }


    .am-modal-footer {

        padding:
            14px 18px 18px;
    }


    .am-modal-footer .am-modal-btn {

        flex:
            1;
    }


    .am-modal-toast-container {

        top:
            12px;

        right:
            12px;

        width:
            calc(100vw - 24px);
    }

}


/* =========================================================
   REDUCED MOTION
========================================================= */

@media (prefers-reduced-motion:reduce) {

    .am-modal-overlay,
    .am-modal,
    .am-modal-btn,
    .am-modal-toast,
    .am-modal-select-menu,
    .am-modal-select-arrow {

        transition:
            none !important;

        animation:
            none !important;
    }
}

`;


    /* =========================================================
       INJECT CSS
    ========================================================= */

    if (!document.getElementById("am-modal-style")) {

        const style =
            document.createElement("style");

        style.id =
            "am-modal-style";

        style.textContent =
            CSS;

        document.head.appendChild(
            style
        );
    }


    /* =========================================================
       AMMODAL
    ========================================================= */

    const AMModal = {

        version:
            "3.0.0",

        current:
            null,

        instances:
            [],

        icons: {

            success:
                "✓",

            error:
                "×",

            warning:
                "!",

            info:
                "i",

            question:
                "?"

        },


        /* =====================================================
           ESCAPE
        ===================================================== */

        escape(value) {

            if (
                value === null ||
                value === undefined
            ) {

                return "";
            }

            return String(value)

                .replace(
                    /&/g,
                    "&amp;"
                )

                .replace(
                    /</g,
                    "&lt;"
                )

                .replace(
                    />/g,
                    "&gt;"
                )

                .replace(
                    /"/g,
                    "&quot;"
                )

                .replace(
                    /'/g,
                    "&#039;"
                );
        },


        /* =====================================================
           UID
        ===================================================== */

        uid(prefix = "am") {

            return (
                prefix +
                "-" +
                Math.random()
                    .toString(36)
                    .slice(2) +
                "-" +
                Date.now()
            );
        },


        /* =====================================================
           OPEN
        ===================================================== */

        open(options = {}) {

            const config = {

                title:
                    "",

                subtitle:
                    "",

                text:
                    "",

                html:
                    "",

                icon:
                    null,

                /*
                 * CENTER:
                 * Desktop = center
                 * Mobile = bottom
                 *
                 * BOTTOM:
                 * Desktop = bottom
                 * Mobile = bottom
                 */

                position:
                    "center",

                /*
                 * Radius baru v3.
                 */

                borderRadius:
                    "22px",

                width:
                    "",

                showClose:
                    true,

                showConfirmButton:
                    true,

                showCancelButton:
                    false,

                confirmButtonText:
                    "OK",

                cancelButtonText:
                    "Batal",

                confirmButtonClass:
                    "am-modal-btn-primary",

                cancelButtonClass:
                    "am-modal-btn-secondary",

                footerAlign:
                    "right",

                closeOnBackdrop:
                    true,

                closeOnEsc:
                    true,

                didOpen:
                    null,

                willClose:
                    null,

                onClose:
                    null,

                onConfirm:
                    null,

                onCancel:
                    null,

                ...options

            };


            /* =================================================
               NORMALIZE POSITION
            ================================================= */

            if (
                config.position !== "center" &&
                config.position !== "bottom"
            ) {

                config.position =
                    "center";
            }


            /* =================================================
               MODAL LAMA DITUTUP
            ================================================= */

            if (
                this.current &&
                !this.current.closed
            ) {

                this.current.close(
                    false
                );
            }


            /* =================================================
               OVERLAY
            ================================================= */

            const overlay =
                document.createElement(
                    "div"
                );

            overlay.className =
                "am-modal-overlay";


            /* =================================================
               MODAL
            ================================================= */

            const modal =
                document.createElement(
                    "div"
                );

            modal.className =
                "am-modal " +
                (
                    config.position ===
                    "bottom"

                        ? "am-modal-bottom"

                        : "am-modal-center"
                );


            modal.setAttribute(
                "role",
                "dialog"
            );


            modal.setAttribute(
                "aria-modal",
                "true"
            );


            /*
             * CUSTOM BORDER RADIUS
             */

            if (
                config.borderRadius !==
                null &&
                config.borderRadius !==
                undefined &&
                config.borderRadius !==
                ""
            ) {

                modal.style.setProperty(
                    "--am-modal-instance-radius",
                    String(
                        config.borderRadius
                    )
                );

            }


            /*
             * CUSTOM WIDTH
             */

            if (
                config.width
            ) {

                modal.style.width =
                    "min(100%, " +
                    config.width +
                    ")";
            }


            /* =================================================
               HANDLE
            ================================================= */

            if (
                config.position ===
                "bottom"
            ) {

                const handle =
                    document.createElement(
                        "div"
                    );

                handle.className =
                    "am-modal-handle";

                modal.appendChild(
                    handle
                );
            }


            /* =================================================
               HEADER
            ================================================= */

            if (
                config.title ||
                config.subtitle ||
                config.icon ||
                config.showClose
            ) {

                const header =
                    document.createElement(
                        "div"
                    );

                header.className =
                    "am-modal-header";


                if (
                    config.icon
                ) {

                    const icon =
                        document.createElement(
                            "div"
                        );

                    icon.className =
                        "am-modal-icon " +
                        "am-modal-icon-" +
                        config.icon;

                    icon.textContent =
                        this.icons[
                            config.icon
                        ] ||
                        config.icon;

                    header.appendChild(
                        icon
                    );
                }


                const headerContent =
                    document.createElement(
                        "div"
                    );

                headerContent.className =
                    "am-modal-header-content";


                if (
                    config.title
                ) {

                    const title =
                        document.createElement(
                            "h2"
                        );

                    title.className =
                        "am-modal-title";

                    title.textContent =
                        config.title;

                    headerContent.appendChild(
                        title
                    );
                }


                if (
                    config.subtitle
                ) {

                    const subtitle =
                        document.createElement(
                            "p"
                        );

                    subtitle.className =
                        "am-modal-subtitle";

                    subtitle.textContent =
                        config.subtitle;

                    headerContent.appendChild(
                        subtitle
                    );
                }


                header.appendChild(
                    headerContent
                );


                if (
                    config.showClose
                ) {

                    const close =
                        document.createElement(
                            "button"
                        );

                    close.type =
                        "button";

                    close.className =
                        "am-modal-close";

                    close.setAttribute(
                        "aria-label",
                        "Tutup"
                    );

                    close.innerHTML =
                        "&times;";


                    close.addEventListener(
                        "click",
                        () => {

                            instance.close();

                        }
                    );


                    header.appendChild(
                        close
                    );
                }


                modal.appendChild(
                    header
                );
            }


            /* =================================================
               BODY
            ================================================= */

            const body =
                document.createElement(
                    "div"
                );

            body.className =
                "am-modal-body";


            if (
                config.html
            ) {

                const html =
                    document.createElement(
                        "div"
                    );

                html.className =
                    "am-modal-html";

                html.innerHTML =
                    config.html;

                body.appendChild(
                    html
                );

            }

            else if (
                config.text
            ) {

                const message =
                    document.createElement(
                        "p"
                    );

                message.className =
                    "am-modal-message";

                message.textContent =
                    config.text;

                body.appendChild(
                    message
                );
            }


            modal.appendChild(
                body
            );


            /* =================================================
               FOOTER
            ================================================= */

            let footer =
                null;

            let confirmButton =
                null;

            let cancelButton =
                null;


            if (
                config.showConfirmButton ||
                config.showCancelButton
            ) {

                footer =
                    document.createElement(
                        "div"
                    );

                footer.className =
                    "am-modal-footer";


                if (
                    config.footerAlign ===
                    "center"
                ) {

                    footer.classList.add(
                        "am-modal-footer-center"
                    );
                }


                if (
                    config.footerAlign ===
                    "between"
                ) {

                    footer.classList.add(
                        "am-modal-footer-between"
                    );
                }


                /* =================================================
                   CANCEL
                ================================================= */

                if (
                    config.showCancelButton
                ) {

                    cancelButton =
                        document.createElement(
                            "button"
                        );

                    cancelButton.type =
                        "button";

                    cancelButton.className =
                        "am-modal-btn " +
                        config.cancelButtonClass;

                    cancelButton.textContent =
                        config.cancelButtonText;


                    cancelButton.addEventListener(
                        "click",
                        async () => {

                            if (
                                instance.closed
                            ) {

                                return;
                            }


                            let result =
                                true;


                            if (
                                typeof config.onCancel ===
                                "function"
                            ) {

                                result =
                                    await config.onCancel({

                                        modal,

                                        body,

                                        overlay,

                                        button:
                                            cancelButton,

                                        close:
                                            instance.close,

                                        instance

                                    });
                            }


                            if (
                                result !== false &&
                                !instance.closed
                            ) {

                                instance.close();
                            }

                        }
                    );


                    footer.appendChild(
                        cancelButton
                    );
                }


                /* =================================================
                   CONFIRM
                ================================================= */

                if (
                    config.showConfirmButton
                ) {

                    confirmButton =
                        document.createElement(
                            "button"
                        );

                    confirmButton.type =
                        "button";

                    confirmButton.className =
                        "am-modal-btn " +
                        config.confirmButtonClass;

                    confirmButton.textContent =
                        config.confirmButtonText;


                    confirmButton.addEventListener(
                        "click",
                        async () => {

                            if (
                                instance.closed
                            ) {

                                return;
                            }


                            if (
                                confirmButton.dataset
                                    .amProcessing ===
                                "true"
                            ) {

                                return;
                            }


                            confirmButton.dataset
                                .amProcessing =
                                "true";


                            let result =
                                true;


                            try {

                                if (
                                    typeof config.onConfirm ===
                                    "function"
                                ) {

                                    result =
                                        await config.onConfirm({

                                            modal,

                                            body,

                                            overlay,

                                            button:
                                                confirmButton,

                                            cancelButton,

                                            close:
                                                instance.close,

                                            instance

                                        });
                                }


                                if (
                                    result !== false &&
                                    !instance.closed
                                ) {

                                    instance.close();
                                }

                            }

                            catch (error) {

                                console.error(
                                    "[AMModal]",
                                    error
                                );

                            }

                            finally {

                                if (
                                    !instance.closed
                                ) {

                                    delete confirmButton
                                        .dataset
                                        .amProcessing;
                                }

                            }

                        }
                    );


                    footer.appendChild(
                        confirmButton
                    );
                }


                modal.appendChild(
                    footer
                );
            }


            /* =================================================
               APPEND
            ================================================= */

            overlay.appendChild(
                modal
            );

            document.body.appendChild(
                overlay
            );


            /* =================================================
               BODY LOCK
            ================================================= */

            const previousOverflow =
                document.body.style.overflow;

            document.body.style.overflow =
                "hidden";


            /* =================================================
               INSTANCE
            ================================================= */

            const instance = {

                overlay,

                modal,

                body,

                footer,

                confirmButton,

                cancelButton,

                config,

                closed:
                    false,

                close: (animated = true) => {

                    if (
                        instance.closed
                    ) {

                        return;
                    }


                    instance.closed =
                        true;


                    if (
                        typeof config.willClose ===
                        "function"
                    ) {

                        config.willClose(
                            instance
                        );
                    }


                    overlay.classList.remove(
                        "am-modal-show"
                    );


                    const remove =
                        () => {

                            if (
                                overlay._escapeHandler
                            ) {

                                document.removeEventListener(
                                    "keydown",
                                    overlay._escapeHandler
                                );
                            }


                            overlay.remove();


                            if (
                                document.body.style.overflow ===
                                "hidden"
                            ) {

                                document.body.style.overflow =
                                    previousOverflow;
                            }


                            const index =
                                AMModal.instances
                                    .indexOf(
                                        instance
                                    );


                            if (
                                index !== -1
                            ) {

                                AMModal.instances
                                    .splice(
                                        index,
                                        1
                                    );
                            }


                            if (
                                AMModal.current ===
                                instance
                            ) {

                                AMModal.current =
                                    null;
                            }


                            if (
                                typeof config.onClose ===
                                "function"
                            ) {

                                config.onClose(
                                    instance
                                );
                            }

                        };


                    if (
                        animated
                    ) {

                        setTimeout(
                            remove,
                            300
                        );

                    }

                    else {

                        remove();
                    }

                },


                closeModal() {

                    instance.close();
                },


                get(selector) {

                    return body.querySelector(
                        selector
                    );
                },


                getAll(selector) {

                    return body.querySelectorAll(
                        selector
                    );
                },


                setLoading(
                    loading = true
                ) {

                    if (
                        !confirmButton
                    ) {

                        return;
                    }


                    if (
                        loading
                    ) {

                        if (
                            confirmButton.dataset
                                .amOriginalText !==
                            undefined
                        ) {

                            return;
                        }


                        confirmButton.dataset
                            .amOriginalText =
                            confirmButton.textContent;


                        confirmButton.disabled =
                            true;


                        confirmButton.innerHTML =
                            `
                            <span class="am-modal-loading"></span>
                            `;

                    }

                    else {

                        const original =
                            confirmButton.dataset
                                .amOriginalText;


                        if (
                            original !==
                            undefined
                        ) {

                            confirmButton.textContent =
                                original;

                            delete confirmButton
                                .dataset
                                .amOriginalText;
                        }


                        confirmButton.disabled =
                            false;
                    }

                }

            };


            this.instances.push(
                instance
            );


            this.current =
                instance;


            /* =================================================
               BACKDROP
            ================================================= */

            overlay.addEventListener(
                "click",
                e => {

                    if (
                        e.target ===
                        overlay &&
                        config.closeOnBackdrop
                    ) {

                        instance.close();
                    }

                }
            );


            /* =================================================
               ESC
            ================================================= */

            const escapeHandler =
                e => {

                    if (
                        e.key ===
                        "Escape" &&

                        config.closeOnEsc &&

                        !instance.closed
                    ) {

                        instance.close();
                    }

                };


            overlay._escapeHandler =
                escapeHandler;


            document.addEventListener(
                "keydown",
                escapeHandler
            );


            /* =================================================
               SELECT
            ================================================= */

            this.initSelects(
                body
            );


            /* =================================================
               SHOW
            ================================================= */

            requestAnimationFrame(
                () => {

                    requestAnimationFrame(
                        () => {

                            if (
                                instance.closed
                            ) {

                                return;
                            }


                            overlay.classList.add(
                                "am-modal-show"
                            );


                            if (
                                typeof config.didOpen ===
                                "function"
                            ) {

                                config.didOpen(
                                    instance
                                );
                            }

                        }
                    );

                }
            );


            return instance;
        },


        /* =====================================================
           CLOSE
        ===================================================== */

        close(animated = true) {

            if (
                this.current &&
                !this.current.closed
            ) {

                this.current.close(
                    animated
                );
            }

        },


        /* =====================================================
           IS OPEN
        ===================================================== */

        isOpen() {

            return !!(
                this.current &&
                !this.current.closed
            );
        },


        /* =====================================================
           ALERT
        ===================================================== */

        alert(options = {}) {

            return this.open({

                ...options,

                showConfirmButton:
                    true,

                showCancelButton:
                    false

            });

        },


        /* =====================================================
           SUCCESS
        ===================================================== */

        success(options = {}) {

            return this.open({

                ...options,

                icon:
                    "success",

                confirmButtonText:
                    options.confirmButtonText ||
                    "OK",

                showConfirmButton:
                    true,

                showCancelButton:
                    false

            });

        },


        /* =====================================================
           ERROR
        ===================================================== */

        error(options = {}) {

            return this.open({

                ...options,

                icon:
                    "error",

                confirmButtonText:
                    options.confirmButtonText ||
                    "Tutup",

                showConfirmButton:
                    true,

                showCancelButton:
                    false

            });

        },


        /* =====================================================
           WARNING
        ===================================================== */

        warning(options = {}) {

            return this.open({

                ...options,

                icon:
                    "warning",

                confirmButtonText:
                    options.confirmButtonText ||
                    "Mengerti",

                showConfirmButton:
                    true,

                showCancelButton:
                    false

            });

        },


        /* =====================================================
           INFO
        ===================================================== */

        info(options = {}) {

            return this.open({

                ...options,

                icon:
                    "info",

                confirmButtonText:
                    options.confirmButtonText ||
                    "OK",

                showConfirmButton:
                    true,

                showCancelButton:
                    false

            });

        },


        /* =====================================================
           QUESTION
        ===================================================== */

        question(options = {}) {

            return this.open({

                ...options,

                icon:
                    "question",

                showConfirmButton:
                    true,

                showCancelButton:
                    true,

                confirmButtonText:
                    options.confirmButtonText ||
                    "Ya",

                cancelButtonText:
                    options.cancelButtonText ||
                    "Batal"

            });

        },


        /* =====================================================
           CONFIRM
        ===================================================== */

        confirm(options = {}) {

            return this.question(
                options
            );
        },


        /* =====================================================
           FORM
        ===================================================== */

        form(options = {}) {

            const fields =
                Array.isArray(
                    options.fields
                )
                    ? options.fields
                    : [];


            const formId =
                this.uid(
                    "am-form"
                );


            const html =
                `
                <form
                    class="am-modal-form"
                    id="${formId}"
                    novalidate
                >

                    ${
                        fields
                            .map(
                                field =>
                                    this.renderField(
                                        field
                                    )
                            )
                            .join("")
                    }

                </form>
                `;


            const originalOnSubmit =
                options.onSubmit;


            const instance =
                this.open({

                    ...options,

                    html,


                    showConfirmButton:
                        options.showConfirmButton !==
                        false,


                    showCancelButton:
                        options.showCancelButton !==
                        false,


                    confirmButtonText:
                        options.confirmButtonText ||
                        "Simpan",


                    cancelButtonText:
                        options.cancelButtonText ||
                        "Batal",


                    onConfirm:
                        async context => {

                            const form =
                                context.body.querySelector(
                                    "#" +
                                    formId
                                );


                            if (
                                !form
                            ) {

                                return false;
                            }


                            if (
                                !form.checkValidity()
                            ) {

                                form.reportValidity();

                                return false;
                            }


                            const data =
                                this.getFormData(
                                    form,
                                    fields
                                );


                            if (
                                typeof originalOnSubmit ===
                                "function"
                            ) {

                                const result =
                                    await originalOnSubmit(
                                        data,
                                        form,
                                        context
                                    );


                                return result;
                            }


                            return true;
                        }

                });


            const form =
                instance.body.querySelector(
                    "#" +
                    formId
                );


            if (
                form &&
                instance.confirmButton
            ) {

                form.addEventListener(
                    "keydown",
                    e => {

                        if (
                            e.key !==
                            "Enter"
                        ) {

                            return;
                        }


                        if (
                            e.target.tagName ===
                            "TEXTAREA"
                        ) {

                            return;
                        }


                        e.preventDefault();


                        instance.confirmButton.click();

                    }
                );
            }


            return instance;
        },


        /* =====================================================
           RENDER FIELD
        ===================================================== */

        renderField(field = {}) {

            const {

                type =
                    "text",

                name =
                    "",

                label =
                    "",

                placeholder =
                    "",

                value =
                    "",

                required =
                    false,

                help =
                    "",

                options =
                    [],

                checked =
                    false,

                rows =
                    5,

                disabled =
                    false

            } = field;


            const id =
                this.uid(
                    "am-field"
                );


            const requiredMark =
                required
                    ? `
                        <span
                            class="am-modal-required"
                        >
                            *
                        </span>
                    `
                    : "";


            /* =================================================
               CHECKBOX
            ================================================= */

            if (
                type ===
                "checkbox"
            ) {

                return `
                    <label
                        class="am-modal-check"
                        for="${id}"
                    >

                        <input
                            class="am-modal-check-input"
                            type="checkbox"
                            id="${id}"
                            name="${this.escape(name)}"
                            value="${this.escape(
                                field.checkboxValue ||
                                "true"
                            )}"
                            ${
                                checked
                                    ? "checked"
                                    : ""
                            }
                            ${
                                required
                                    ? "required"
                                    : ""
                            }
                            ${
                                disabled
                                    ? "disabled"
                                    : ""
                            }
                        >

                        <span
                            class="am-modal-check-box"
                        ></span>

                        <span
                            class="am-modal-check-content"
                        >

                            <span
                                class="am-modal-check-title"
                            >
                                ${this.escape(label)}
                            </span>

                            ${
                                help
                                    ? `
                                    <span
                                        class="am-modal-check-desc"
                                    >
                                        ${this.escape(help)}
                                    </span>
                                    `
                                    : ""
                            }

                        </span>

                    </label>
                `;
            }


            /* =================================================
               SWITCH
            ================================================= */

            if (
                type ===
                "switch"
            ) {

                return `
                    <label
                        class="am-modal-switch"
                        for="${id}"
                    >

                        <span
                            class="am-modal-check-content"
                        >

                            <span
                                class="am-modal-check-title"
                            >
                                ${this.escape(label)}
                            </span>

                            ${
                                help
                                    ? `
                                    <span
                                        class="am-modal-check-desc"
                                    >
                                        ${this.escape(help)}
                                    </span>
                                    `
                                    : ""
                            }

                        </span>

                        <input
                            class="am-modal-switch-input"
                            type="checkbox"
                            id="${id}"
                            name="${this.escape(name)}"
                            value="true"
                            ${
                                checked
                                    ? "checked"
                                    : ""
                            }
                            ${
                                disabled
                                    ? "disabled"
                                    : ""
                            }
                        >

                        <span
                            class="am-modal-switch-track"
                        ></span>

                    </label>
                `;
            }


            /* =================================================
               RADIO
            ================================================= */

            if (
                type ===
                "radio"
            ) {

                return `
                    <div
                        class="am-modal-field"
                    >

                        ${
                            label
                                ? `
                                <label
                                    class="am-modal-label"
                                >
                                    ${this.escape(label)}
                                    ${requiredMark}
                                </label>
                                `
                                : ""
                        }

                        <div
                            class="am-modal-radio-group"
                        >

                            ${
                                options
                                    .map(
                                        option => {

                                            const item =
                                                typeof option ===
                                                "string"

                                                    ? {
                                                        value:
                                                            option,

                                                        label:
                                                            option
                                                    }

                                                    : option;


                                            const radioId =
                                                this.uid(
                                                    "am-radio"
                                                );


                                            return `
                                                <label
                                                    class="am-modal-radio"
                                                    for="${radioId}"
                                                >

                                                    <input
                                                        class="am-modal-radio-input"
                                                        type="radio"
                                                        id="${radioId}"
                                                        name="${this.escape(name)}"
                                                        value="${this.escape(
                                                            item.value
                                                        )}"
                                                        ${
                                                            String(
                                                                item.value
                                                            ) ===
                                                            String(
                                                                value
                                                            )
                                                                ? "checked"
                                                                : ""
                                                        }
                                                        ${
                                                            required
                                                                ? "required"
                                                                : ""
                                                        }
                                                    >

                                                    <span
                                                        class="am-modal-radio-circle"
                                                    ></span>

                                                    <span
                                                        class="am-modal-radio-text"
                                                    >
                                                        ${this.escape(
                                                            item.label
                                                        )}
                                                    </span>

                                                </label>
                                            `;

                                        }
                                    )
                                    .join("")
                            }

                        </div>

                        ${
                            help
                                ? `
                                <span
                                    class="am-modal-help"
                                >
                                    ${this.escape(help)}
                                </span>
                                `
                                : ""
                        }

                    </div>
                `;
            }


            /* =================================================
               SELECT
            ================================================= */

            if (
                type ===
                "select"
            ) {

                const normalized =
                    options.map(
                        option =>
                            typeof option ===
                            "string"

                                ? {
                                    value:
                                        option,

                                    label:
                                        option
                                }

                                : option
                    );


                const selected =
                    normalized.find(
                        option =>
                            String(
                                option.value
                            ) ===
                            String(
                                value
                            )
                    );


                const selectedText =
                    selected
                        ? selected.label
                        : (
                            placeholder ||
                            "Pilih..."
                        );


                return `
                    <div
                        class="am-modal-field"
                    >

                        ${
                            label
                                ? `
                                <label
                                    class="am-modal-label"
                                    for="${id}"
                                >
                                    ${this.escape(label)}
                                    ${requiredMark}
                                </label>
                                `
                                : ""
                        }

                        <div
                            class="am-modal-select-wrap"
                            data-am-select
                        >

                            <input
                                type="hidden"
                                name="${this.escape(name)}"
                                value="${this.escape(value)}"
                                ${
                                    required
                                        ? "required"
                                        : ""
                                }
                            >

                            <button
                                type="button"
                                class="am-modal-select-button"
                                data-am-select-button
                                aria-haspopup="listbox"
                                aria-expanded="false"
                            >

                                <span
                                    data-am-select-label
                                >
                                    ${this.escape(
                                        selectedText
                                    )}
                                </span>

                                <span
                                    class="am-modal-select-arrow"
                                ></span>

                            </button>


                            <div
                                class="am-modal-select-menu"
                                data-am-select-menu
                                role="listbox"
                            >

                                ${
                                    normalized
                                        .map(
                                            item => {

                                                const isSelected =
                                                    String(
                                                        item.value
                                                    ) ===
                                                    String(
                                                        value
                                                    );


                                                return `
                                                    <button
                                                        type="button"
                                                        class="
                                                            am-modal-select-option
                                                            ${
                                                                isSelected
                                                                    ? "selected"
                                                                    : ""
                                                            }
                                                        "
                                                        data-value="${this.escape(
                                                            item.value
                                                        )}"
                                                        data-label="${this.escape(
                                                            item.label
                                                        )}"
                                                    >
                                                        ${this.escape(
                                                            item.label
                                                        )}
                                                    </button>
                                                `;

                                            }
                                        )
                                        .join("")
                                }

                            </div>

                        </div>

                        ${
                            help
                                ? `
                                <span
                                    class="am-modal-help"
                                >
                                    ${this.escape(help)}
                                </span>
                                `
                                : ""
                        }

                    </div>
                `;
            }


            /* =================================================
               TEXTAREA
            ================================================= */

            if (
                type ===
                "textarea"
            ) {

                return `
                    <div
                        class="am-modal-field"
                    >

                        ${
                            label
                                ? `
                                <label
                                    class="am-modal-label"
                                    for="${id}"
                                >
                                    ${this.escape(label)}
                                    ${requiredMark}
                                </label>
                                `
                                : ""
                        }

                        <textarea
                            class="am-modal-textarea"
                            id="${id}"
                            name="${this.escape(name)}"
                            rows="${rows}"
                            placeholder="${this.escape(
                                placeholder
                            )}"
                            ${
                                required
                                    ? "required"
                                    : ""
                            }
                            ${
                                disabled
                                    ? "disabled"
                                    : ""
                            }
                        >${this.escape(
                            value
                        )}</textarea>

                        ${
                            help
                                ? `
                                <span
                                    class="am-modal-help"
                                >
                                    ${this.escape(help)}
                                </span>
                                `
                                : ""
                        }

                    </div>
                `;
            }


            /* =================================================
               DEFAULT INPUT
            ================================================= */

            return `
                <div
                    class="am-modal-field"
                >

                    ${
                        label
                            ? `
                            <label
                                class="am-modal-label"
                                for="${id}"
                            >
                                ${this.escape(label)}
                                ${requiredMark}
                            </label>
                            `
                            : ""
                    }

                    <input
                        class="am-modal-input"
                        id="${id}"
                        type="${this.escape(type)}"
                        name="${this.escape(name)}"
                        value="${this.escape(value)}"
                        placeholder="${this.escape(
                            placeholder
                        )}"
                        ${
                            required
                                ? "required"
                                : ""
                        }
                        ${
                            disabled
                                ? "disabled"
                                : ""
                        }
                    >

                    ${
                        help
                            ? `
                            <span
                                class="am-modal-help"
                            >
                                ${this.escape(help)}
                            </span>
                            `
                            : ""
                    }

                </div>
            `;
        },


        /* =====================================================
           SELECT INITIALIZER
        ===================================================== */

        initSelects(container) {

            const selects =
                container.querySelectorAll(
                    "[data-am-select]"
                );


            selects.forEach(
                wrapper => {

                    const button =
                        wrapper.querySelector(
                            "[data-am-select-button]"
                        );

                    const menu =
                        wrapper.querySelector(
                            "[data-am-select-menu]"
                        );

                    const hidden =
                        wrapper.querySelector(
                            'input[type="hidden"]'
                        );

                    const label =
                        wrapper.querySelector(
                            "[data-am-select-label]"
                        );


                    if (
                        !button ||
                        !menu ||
                        !hidden ||
                        !label
                    ) {

                        return;
                    }


                    button.addEventListener(
                        "click",
                        e => {

                            e.stopPropagation();


                            const isOpen =
                                wrapper.classList
                                    .contains(
                                        "open"
                                    );


                            this.closeAllSelects(
                                wrapper
                            );


                            if (
                                !isOpen
                            ) {

                                wrapper.classList
                                    .add(
                                        "open"
                                    );


                                button.setAttribute(
                                    "aria-expanded",
                                    "true"
                                );

                            }

                        }
                    );


                    menu
                        .querySelectorAll(
                            ".am-modal-select-option"
                        )
                        .forEach(
                            option => {

                                option.addEventListener(
                                    "click",
                                    () => {

                                        hidden.value =
                                            option.dataset
                                                .value;


                                        label.textContent =
                                            option.dataset
                                                .label;


                                        menu
                                            .querySelectorAll(
                                                ".am-modal-select-option"
                                            )
                                            .forEach(
                                                item => {

                                                    item.classList
                                                        .remove(
                                                            "selected"
                                                        );

                                                }
                                            );


                                        option.classList
                                            .add(
                                                "selected"
                                            );


                                        wrapper.classList
                                            .remove(
                                                "open"
                                            );


                                        button.setAttribute(
                                            "aria-expanded",
                                            "false"
                                        );


                                        hidden.dispatchEvent(
                                            new Event(
                                                "change",
                                                {
                                                    bubbles:
                                                        true
                                                }
                                            )
                                        );

                                    }
                                );

                            }
                        );

                }
            );


            if (
                !this._selectDocumentHandler
            ) {

                this._selectDocumentHandler =
                    e => {

                        if (
                            !e.target.closest(
                                "[data-am-select]"
                            )
                        ) {

                            this.closeAllSelects();
                        }

                    };


                document.addEventListener(
                    "click",
                    this._selectDocumentHandler
                );
            }

        },


        /* =====================================================
           CLOSE SELECTS
        ===================================================== */

        closeAllSelects(
            except = null
        ) {

            document
                .querySelectorAll(
                    "[data-am-select].open"
                )
                .forEach(
                    wrapper => {

                        if (
                            wrapper ===
                            except
                        ) {

                            return;
                        }


                        wrapper.classList
                            .remove(
                                "open"
                            );


                        const button =
                            wrapper.querySelector(
                                "[data-am-select-button]"
                            );


                        if (
                            button
                        ) {

                            button.setAttribute(
                                "aria-expanded",
                                "false"
                            );
                        }

                    }
                );
        },


        /* =====================================================
           FORM DATA
        ===================================================== */

        getFormData(
            form,
            fields = []
        ) {

            const result =
                {};


            fields.forEach(
                field => {

                    if (
                        !field.name
                    ) {

                        return;
                    }


                    /* CHECKBOX */

                    if (
                        field.type ===
                        "checkbox"
                    ) {

                        const element =
                            form.querySelector(
                                `input[name="${CSS.escape(
                                    field.name
                                )}"]`
                            );


                        result[
                            field.name
                        ] =
                            !!(
                                element &&
                                element.checked
                            );


                        return;
                    }


                    /* SWITCH */

                    if (
                        field.type ===
                        "switch"
                    ) {

                        const element =
                            form.querySelector(
                                `input[name="${CSS.escape(
                                    field.name
                                )}"]`
                            );


                        result[
                            field.name
                        ] =
                            !!(
                                element &&
                                element.checked
                            );


                        return;
                    }


                    /* RADIO */

                    if (
                        field.type ===
                        "radio"
                    ) {

                        const element =
                            form.querySelector(
                                `input[name="${CSS.escape(
                                    field.name
                                )}"]:checked`
                            );


                        result[
                            field.name
                        ] =
                            element
                                ? element.value
                                : null;


                        return;
                    }


                    /* NORMAL */

                    const element =
                        form.elements[
                            field.name
                        ];


                    result[
                        field.name
                    ] =
                        element
                            ? element.value
                            : "";

                }
            );


            return result;
        },


        /* =====================================================
           TOAST
        ===================================================== */

        toast(options = {}) {

            let container =
                document.querySelector(
                    ".am-modal-toast-container"
                );


            if (
                !container
            ) {

                container =
                    document.createElement(
                        "div"
                    );

                container.className =
                    "am-modal-toast-container";

                document.body.appendChild(
                    container
                );
            }


            const toast =
                document.createElement(
                    "div"
                );

            toast.className =
                "am-modal-toast";


            if (
                options.icon
            ) {

                const icon =
                    document.createElement(
                        "div"
                    );

                icon.className =
                    "am-modal-icon " +
                    "am-modal-icon-" +
                    options.icon;

                icon.textContent =
                    this.icons[
                        options.icon
                    ] ||
                    options.icon;

                icon.style.width =
                    "34px";

                icon.style.height =
                    "34px";

                icon.style.borderRadius =
                    "10px";

                icon.style.fontSize =
                    "16px";

                toast.appendChild(
                    icon
                );
            }


            const text =
                document.createElement(
                    "div"
                );

            text.className =
                "am-modal-toast-text";

            text.textContent =
                options.text ||
                options.title ||
                "";


            toast.appendChild(
                text
            );


            container.appendChild(
                toast
            );


            const duration =
                options.duration ||
                3000;


            let timer =
                setTimeout(
                    () => {

                        toast.style.opacity =
                            "0";

                        toast.style.transform =
                            "translateY(-8px)";

                        toast.style.transition =
                            ".25s ease";


                        setTimeout(
                            () => {

                                toast.remove();

                            },
                            250
                        );

                    },
                    duration
                );


            toast.close =
                () => {

                    clearTimeout(
                        timer
                    );

                    toast.remove();
                };


            return toast;
        }

    };


    /* =========================================================
       GLOBAL
    ========================================================= */

    window.AMModal =
        AMModal;


})(window, document);
