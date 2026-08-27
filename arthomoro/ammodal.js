/* =========================================================
   ARTHOMORO MODAL
   Single Script Library
   SweetAlert2-inspired
   Version: 1.0.0

   Usage:
   <script src="arthomoro-modal.js"></script>

   AMModal.fire({...})
   AMModal.success({...})
   AMModal.error({...})
   AMModal.warning({...})
   AMModal.info({...})
   AMModal.question({...})
   AMModal.confirm({...})
   AMModal.form({...})
   AMModal.toast({...})
========================================================= */

(function (window, document) {

    "use strict";


    /* =========================================================
       PREVENT DOUBLE LOAD
    ========================================================= */

    if (window.AMModal) {
        return;
    }


    /* =========================================================
       INJECT CSS
    ========================================================= */

    const style = document.createElement("style");

    style.id = "arthomoro-modal-style";

    style.textContent = `

    :root {

        --am-modal-bg:
            var(--contentB, #ffffff);

        --am-modal-border:
            var(--contentL, #e5e7eb);

        --am-modal-primary:
            var(--linkC, #2563eb);

        --am-modal-text:
            var(--textC, #172033);

        --am-modal-muted:
            var(--textC, #64748b);

        --am-modal-radius:
            22px;

        --am-modal-shadow:
            0 24px 70px rgba(0,0,0,.18),
            0 8px 25px rgba(0,0,0,.08);
    }


    /* =====================================================
       OVERLAY
    ===================================================== */

    .am-modal-overlay {

        position: fixed;

        inset: 0;

        z-index: 999999;

        display: flex;

        align-items: center;

        justify-content: center;

        padding: 18px;

        background:
            rgba(15,23,42,.28);

        backdrop-filter:
            blur(7px);

        -webkit-backdrop-filter:
            blur(7px);

        opacity: 0;

        visibility: hidden;

        transition:
            opacity .25s ease,
            visibility .25s ease;
    }


    .am-modal-overlay.am-modal-show {

        opacity: 1;

        visibility: visible;
    }


    /* =====================================================
       MODAL
    ===================================================== */

    .am-modal {

        width:
            min(100%,520px);

        max-height:
            calc(100dvh - 36px);

        display:
            flex;

        flex-direction:
            column;

        color:
            var(--am-modal-text);

        background:
            var(--am-modal-bg);

        border:
            1px solid var(--am-modal-border);

        border-radius:
            var(--am-modal-radius);

        box-shadow:
            var(--am-modal-shadow);

        overflow:
            hidden;

        transform:
            translateY(18px) scale(.97);

        opacity:
            0;

        transition:
            transform .28s cubic-bezier(.22,1,.36,1),
            opacity .2s ease;
    }


    .am-modal-show .am-modal {

        transform:
            translateY(0) scale(1);

        opacity:
            1;
    }


    /* =====================================================
       BOTTOM SHEET
    ===================================================== */

    .am-modal.am-modal-bottom {

        align-self:
            flex-end;

        margin-top:
            auto;

        width:
            min(100%,600px);

        border-radius:
            24px 24px 0 0;

        transform:
            translateY(100%);
    }


    .am-modal-show
    .am-modal.am-modal-bottom {

        transform:
            translateY(0);
    }


    /* =====================================================
       HEADER
    ===================================================== */

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
            1px solid var(--am-modal-border);
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

        font-size:
            21px;

        font-weight:
            700;

        line-height:
            1.25;

        color:
            var(--am-modal-text);
    }


    .am-modal-subtitle {

        margin:
            5px 0 0;

        font-size:
            13px;

        line-height:
            1.5;

        color:
            var(--am-modal-muted);
    }


    /* =====================================================
       CLOSE
    ===================================================== */

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

        border:
            0;

        border-radius:
            50%;

        color:
            var(--am-modal-text);

        background:
            transparent;

        cursor:
            pointer;

        font-family:
            inherit;

        font-size:
            24px;

        line-height:
            1;

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
            scale(.9);
    }


    /* =====================================================
       ICON
    ===================================================== */

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
            23px;

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


    /* =====================================================
       BODY
    ===================================================== */

    .am-modal-body {

        padding:
            20px;

        overflow-y:
            auto;

        overscroll-behavior:
            contain;
    }


    .am-modal-message {

        margin:
            0;

        font-size:
            15px;

        line-height:
            1.65;

        color:
            var(--am-modal-text);
    }


    /* =====================================================
       FOOTER
    ===================================================== */

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
            1px solid var(--am-modal-border);
    }


    /* =====================================================
       BUTTON
    ===================================================== */

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

        font-family:
            inherit;

        font-size:
            14px;

        font-weight:
            600;

        cursor:
            pointer;

        transition:
            transform .15s ease,
            opacity .15s ease,
            background .15s ease;
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
    }


    .am-modal-btn-primary {

        color:
            #fff;

        background:
            var(--am-modal-primary);
    }


    .am-modal-btn-primary:hover {

        opacity:
            .9;
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


    /* =====================================================
       FORM
    ===================================================== */

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

        font-size:
            13px;

        font-weight:
            600;

        color:
            var(--am-modal-text);
    }


    .am-modal-required {

        color:
            #ef4444;
    }


    .am-modal-help {

        margin:
            -2px 0 0;

        font-size:
            12px;

        line-height:
            1.4;

        color:
            var(--am-modal-muted);
    }


    /* =====================================================
       INPUT
    ===================================================== */

    .am-modal-input,
    .am-modal-select,
    .am-modal-textarea {

        width:
            100%;

        box-sizing:
            border-box;

        color:
            var(--am-modal-text);

        background:
            var(--am-modal-bg);

        border:
            1px solid var(--am-modal-border);

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


    .am-modal-input,
    .am-modal-select {

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
    .am-modal-select:focus,
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


    /* =====================================================
       CHECKBOX
    ===================================================== */

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


    .am-modal-check input {

        width:
            18px;

        height:
            18px;

        flex:
            0 0 auto;

        margin:
            2px 0 0;

        accent-color:
            var(--am-modal-primary);

        cursor:
            pointer;
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

        font-size:
            14px;

        font-weight:
            600;
    }


    .am-modal-check-desc {

        font-size:
            12px;

        line-height:
            1.4;

        color:
            var(--am-modal-muted);
    }


    /* =====================================================
       RADIO
    ===================================================== */

    .am-modal-radio-group {

        display:
            flex;

        flex-direction:
            column;

        gap:
            9px;
    }


    .am-modal-radio {

        display:
            flex;

        align-items:
            center;

        gap:
            10px;

        padding:
            11px 12px;

        border:
            1px solid var(--am-modal-border);

        border-radius:
            12px;

        cursor:
            pointer;

        transition:
            border-color .18s ease;
    }


    .am-modal-radio:has(input:checked) {

        border-color:
            var(--am-modal-primary);
    }


    .am-modal-radio input {

        accent-color:
            var(--am-modal-primary);
    }


    /* =====================================================
       LOADING
    ===================================================== */

    .am-modal-loading {

        width:
            18px;

        height:
            18px;

        border:
            2px solid rgba(255,255,255,.45);

        border-top-color:
            #fff;

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


    /* =====================================================
       TOAST
    ===================================================== */

    .am-modal-toast-container {

        position:
            fixed;

        z-index:
            1000000;

        top:
            18px;

        right:
            18px;

        display:
            flex;

        flex-direction:
            column;

        gap:
            10px;

        width:
            min(380px,calc(100vw - 36px));

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
            1px solid var(--am-modal-border);

        border-radius:
            14px;

        box-shadow:
            var(--am-modal-shadow);

        pointer-events:
            auto;

        animation:
            am-modal-toast-in .3s
            cubic-bezier(.22,1,.36,1);
    }


    @keyframes am-modal-toast-in {

        from {

            opacity:
                0;

            transform:
                translateY(-10px) scale(.97);
        }

        to {

            opacity:
                1;

            transform:
                translateY(0) scale(1);
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


    /* =====================================================
       MOBILE
    ===================================================== */

    @media (max-width:600px) {

        .am-modal-overlay {

            align-items:
                flex-end;

            padding:
                0;
        }


        .am-modal {

            width:
                100%;

            max-height:
                calc(100dvh - 15px);

            border-radius:
                22px 22px 0 0;
        }


        .am-modal.am-modal-center {

            transform:
                translateY(20px) scale(.98);
        }


        .am-modal-show
        .am-modal.am-modal-center {

            transform:
                translateY(0) scale(1);
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
    }


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    @media (prefers-reduced-motion:reduce) {

        .am-modal,
        .am-modal-overlay,
        .am-modal-toast,
        .am-modal-btn {

            transition:
                none !important;

            animation:
                none !important;
        }
    }

    `;

    document.head.appendChild(style);


    /* =========================================================
       MODAL OBJECT
    ========================================================= */

    const AMModal = {

        current: null,


        /* =====================================================
           ICON
        ===================================================== */

        icons: {

            success: "✓",

            error: "×",

            warning: "!",

            info: "i",

            question: "?"
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

                .replace(/&/g, "&amp;")

                .replace(/</g, "&lt;")

                .replace(/>/g, "&gt;")

                .replace(/"/g, "&quot;")

                .replace(/'/g, "&#039;");
        },


        /* =====================================================
           FIRE
        ===================================================== */

        fire(options = {}) {

            return new Promise((resolve) => {

                const config = {

                    title: "",

                    subtitle: "",

                    text: "",

                    html: "",

                    icon: null,

                    confirmButtonText:
                        "OK",

                    cancelButtonText:
                        "Batal",

                    showConfirmButton:
                        true,

                    showCancelButton:
                        false,

                    showClose:
                        true,

                    confirmButtonClass:
                        "am-modal-btn-primary",

                    closeOnBackdrop:
                        true,

                    closeOnEsc:
                        true,

                    position:
                        "center",

                    width:
                        "",

                    didOpen:
                        null,

                    willClose:
                        null,

                    onConfirm:
                        null,

                    onCancel:
                        null,

                    onClose:
                        null,

                    ...options
                };


                /* Close existing */

                this.close(false);


                /* =================================================
                   OVERLAY
                ================================================= */

                const overlay =
                    document.createElement("div");

                overlay.className =
                    "am-modal-overlay";


                /* =================================================
                   MODAL
                ================================================= */

                const modal =
                    document.createElement("div");

                modal.className =
                    "am-modal " +
                    (
                        config.position === "bottom"
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


                if (config.width) {

                    modal.style.maxWidth =
                        config.width;
                }


                /* =================================================
                   HEADER
                ================================================= */

                const header =
                    document.createElement("div");

                header.className =
                    "am-modal-header";


                /* Icon */

                if (config.icon) {

                    const icon =
                        document.createElement("div");

                    icon.className =
                        "am-modal-icon " +
                        "am-modal-icon-" +
                        config.icon;

                    icon.textContent =
                        this.icons[config.icon] ||
                        config.icon;

                    header.appendChild(icon);
                }


                /* Header content */

                const headerContent =
                    document.createElement("div");

                headerContent.className =
                    "am-modal-header-content";


                if (config.title) {

                    const title =
                        document.createElement("h2");

                    title.className =
                        "am-modal-title";

                    title.textContent =
                        config.title;

                    headerContent.appendChild(
                        title
                    );
                }


                if (config.subtitle) {

                    const subtitle =
                        document.createElement("p");

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


                /* Close */

                if (config.showClose) {

                    const close =
                        document.createElement("button");

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

                            if (
                                typeof config.onClose ===
                                "function"
                            ) {

                                config.onClose();
                            }


                            finish({
                                isConfirmed: false,
                                isDenied: false,
                                isDismissed: true,
                                dismiss: "close"
                            });
                        }
                    );


                    header.appendChild(
                        close
                    );
                }


                modal.appendChild(
                    header
                );


                /* =================================================
                   BODY
                ================================================= */

                const body =
                    document.createElement("div");

                body.className =
                    "am-modal-body";


                if (config.html) {

                    body.innerHTML =
                        config.html;

                } else if (config.text) {

                    const message =
                        document.createElement("p");

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

                if (
                    config.showConfirmButton ||
                    config.showCancelButton
                ) {

                    const footer =
                        document.createElement("div");

                    footer.className =
                        "am-modal-footer";


                    /* Cancel */

                    if (
                        config.showCancelButton
                    ) {

                        const cancel =
                            document.createElement("button");

                        cancel.type =
                            "button";

                        cancel.className =
                            "am-modal-btn " +
                            "am-modal-btn-secondary";

                        cancel.textContent =
                            config.cancelButtonText;


                        cancel.addEventListener(
                            "click",
                            async () => {

                                let result = true;


                                if (
                                    typeof config.onCancel ===
                                    "function"
                                ) {

                                    result =
                                        await config.onCancel({
                                            modal,
                                            body
                                        });
                                }


                                if (
                                    result !== false
                                ) {

                                    finish({
                                        isConfirmed: false,
                                        isDenied: false,
                                        isDismissed: true,
                                        dismiss: "cancel"
                                    });
                                }

                            }
                        );


                        footer.appendChild(
                            cancel
                        );
                    }


                    /* Confirm */

                    if (
                        config.showConfirmButton
                    ) {

                        const confirm =
                            document.createElement("button");

                        confirm.type =
                            "button";

                        confirm.className =
                            "am-modal-btn " +
                            config.confirmButtonClass;

                        confirm.textContent =
                            config.confirmButtonText;


                        confirm.addEventListener(
                            "click",
                            async () => {

                                let result = true;


                                if (
                                    typeof config.onConfirm ===
                                    "function"
                                ) {

                                    result =
                                        await config.onConfirm({
                                            modal,
                                            body
                                        });
                                }


                                if (
                                    result !== false
                                ) {

                                    finish({
                                        isConfirmed: true,
                                        isDenied: false,
                                        isDismissed: false
                                    });
                                }

                            }
                        );


                        footer.appendChild(
                            confirm
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

                const oldOverflow =
                    document.body.style.overflow;

                document.body.style.overflow =
                    "hidden";


                /* =================================================
                   ESC
                ================================================= */

                const escapeHandler =
                    function (event) {

                        if (
                            event.key === "Escape" &&
                            config.closeOnEsc
                        ) {

                            finish({
                                isConfirmed: false,
                                isDenied: false,
                                isDismissed: true,
                                dismiss: "esc"
                            });
                        }
                    };


                document.addEventListener(
                    "keydown",
                    escapeHandler
                );


                /* =================================================
                   BACKDROP
                ================================================= */

                overlay.addEventListener(
                    "click",
                    event => {

                        if (
                            event.target === overlay &&
                            config.closeOnBackdrop
                        ) {

                            finish({
                                isConfirmed: false,
                                isDenied: false,
                                isDismissed: true,
                                dismiss: "backdrop"
                            });
                        }

                    }
                );


                /* =================================================
                   CURRENT
                ================================================= */

                this.current = {

                    overlay,

                    modal,

                    body,

                    config,

                    oldOverflow,

                    escapeHandler,

                    resolve,

                    finished: false
                };


                /* =================================================
                   SHOW
                ================================================= */

                requestAnimationFrame(() => {

                    requestAnimationFrame(() => {

                        overlay.classList.add(
                            "am-modal-show"
                        );


                        if (
                            typeof config.didOpen ===
                            "function"
                        ) {

                            config.didOpen({
                                modal,
                                body
                            });
                        }


                        /* Focus */

                        const input =
                            modal.querySelector(
                                "input, select, textarea, button"
                            );

                        if (input) {

                            setTimeout(() => {

                                try {
                                    input.focus();
                                } catch (_) {}

                            }, 100);
                        }

                    });

                });


                /* =================================================
                   FINISH
                ================================================= */

                const finish = result => {

                    if (
                        !this.current ||
                        this.current.finished
                    ) {
                        return;
                    }


                    this.current.finished =
                        true;


                    if (
                        typeof config.willClose ===
                        "function"
                    ) {

                        config.willClose({
                            modal,
                            body
                        });
                    }


                    overlay.classList.remove(
                        "am-modal-show"
                    );


                    setTimeout(() => {

                        document.removeEventListener(
                            "keydown",
                            escapeHandler
                        );


                        overlay.remove();


                        document.body.style.overflow =
                            oldOverflow;


                        if (
                            this.current &&
                            this.current.overlay ===
                            overlay
                        ) {

                            this.current =
                                null;
                        }


                        resolve(result);

                    }, 280);

                };


            });
        },


        /* =====================================================
           CLOSE
        ===================================================== */

        close(animated = true) {

            if (!this.current) {
                return;
            }


            const current =
                this.current;


            if (
                current.finished
            ) {
                return;
            }


            current.finished =
                true;


            if (
                typeof current.config.willClose ===
                "function"
            ) {

                current.config.willClose({
                    modal: current.modal,
                    body: current.body
                });
            }


            current.overlay.classList.remove(
                "am-modal-show"
            );


            const remove = () => {

                document.removeEventListener(
                    "keydown",
                    current.escapeHandler
                );


                current.overlay.remove();


                document.body.style.overflow =
                    current.oldOverflow;


                this.current =
                    null;
            };


            if (animated) {

                setTimeout(
                    remove,
                    280
                );

            } else {

                remove();
            }

        },


        /* =====================================================
           ALERT
        ===================================================== */

        alert(options = {}) {

            return this.fire({

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

            return this.fire({

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

            return this.fire({

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

            return this.fire({

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

            return this.fire({

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

            return this.fire({

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
                options.fields || [];


            const formId =
                "am-form-" +
                Math.random()
                    .toString(36)
                    .slice(2);


            const html = `

                <form
                    class="am-modal-form"
                    id="${formId}"
                >

                    ${fields.map(
                        field =>
                            this.renderField(field)
                    ).join("")}

                </form>

            `;


            return this.fire({

                ...options,

                html,

                showConfirmButton:
                    true,

                showCancelButton:
                    options.showCancelButton !== false,

                confirmButtonText:
                    options.confirmButtonText ||
                    "Simpan",

                cancelButtonText:
                    options.cancelButtonText ||
                    "Batal",


                onConfirm:
                    async ({ body }) => {

                        const form =
                            body.querySelector(
                                "#" + formId
                            );


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
                            typeof options.onSubmit ===
                            "function"
                        ) {

                            return await options.onSubmit(
                                data,
                                form
                            );
                        }


                        return true;
                    }

            });
        },


        /* =====================================================
           RENDER FIELD
        ===================================================== */

        renderField(field) {

            const {

                type = "text",

                name = "",

                label = "",

                placeholder = "",

                value = "",

                required = false,

                help = "",

                options = [],

                checked = false,

                rows = 5

            } = field;


            const id =
                "am-field-" +
                Math.random()
                    .toString(36)
                    .slice(2);


            /* =================================================
               CHECKBOX
            ================================================= */

            if (
                type === "checkbox"
            ) {

                return `

                    <label
                        class="am-modal-check"
                    >

                        <input
                            type="checkbox"
                            name="${this.escape(name)}"
                            value="${this.escape(
                                field.checkboxValue ||
                                "true"
                            )}"
                            ${checked ? "checked" : ""}
                            ${required ? "required" : ""}
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

                    </label>

                `;
            }


            /* =================================================
               RADIO
            ================================================= */

            if (
                type === "radio"
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

                                    ${
                                        required
                                            ? `
                                            <span
                                                class="am-modal-required"
                                            >*</span>
                                            `
                                            : ""
                                    }

                                </label>
                                `
                                : ""
                        }


                        <div
                            class="am-modal-radio-group"
                        >

                            ${options.map(
                                option => {

                                    const item =
                                        typeof option ===
                                        "string"

                                            ? {
                                                value: option,
                                                label: option
                                            }

                                            : option;


                                    return `

                                        <label
                                            class="am-modal-radio"
                                        >

                                            <input
                                                type="radio"
                                                name="${this.escape(name)}"
                                                value="${this.escape(
                                                    item.value
                                                )}"
                                                ${
                                                    item.value ==
                                                    value
                                                        ? "checked"
                                                        : ""
                                                }
                                                ${
                                                    required
                                                        ? "required"
                                                        : ""
                                                }
                                            >

                                            <span>
                                                ${this.escape(
                                                    item.label
                                                )}
                                            </span>

                                        </label>

                                    `;

                                }
                            ).join("")}

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
                type === "select"
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

                                    ${
                                        required
                                            ? `
                                            <span
                                                class="am-modal-required"
                                            >*</span>
                                            `
                                            : ""
                                    }

                                </label>
                                `
                                : ""
                        }


                        <select
                            class="am-modal-select"
                            id="${id}"
                            name="${this.escape(name)}"
                            ${
                                required
                                    ? "required"
                                    : ""
                            }
                        >

                            ${
                                placeholder
                                    ? `
                                    <option
                                        value=""
                                    >
                                        ${this.escape(
                                            placeholder
                                        )}
                                    </option>
                                    `
                                    : ""
                            }


                            ${options.map(
                                option => {

                                    const item =
                                        typeof option ===
                                        "string"

                                            ? {
                                                value: option,
                                                label: option
                                            }

                                            : option;


                                    return `

                                        <option
                                            value="${this.escape(
                                                item.value
                                            )}"
                                            ${
                                                item.value ==
                                                value
                                                    ? "selected"
                                                    : ""
                                            }
                                        >
                                            ${this.escape(
                                                item.label
                                            )}
                                        </option>

                                    `;

                                }
                            ).join("")}

                        </select>


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
                type === "textarea"
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

                                    ${
                                        required
                                            ? `
                                            <span
                                                class="am-modal-required"
                                            >*</span>
                                            `
                                            : ""
                                    }

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
                        >${this.escape(value)}</textarea>


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

                                ${
                                    required
                                        ? `
                                        <span
                                            class="am-modal-required"
                                        >*</span>
                                        `
                                        : ""
                                }

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
           GET FORM DATA
        ===================================================== */

        getFormData(form, fields) {

            const result = {};


            fields.forEach(field => {

                const elements =
                    form.elements[field.name];


                if (!elements) {
                    return;
                }


                /* Checkbox */

                if (
                    field.type === "checkbox"
                ) {

                    result[field.name] =
                        elements.checked;

                    return;
                }


                /* Radio */

                if (
                    field.type === "radio"
                ) {

                    const checked =
                        form.querySelector(
                            `input[name="${CSS.escape(
                                field.name
                            )}"]:checked`
                        );


                    result[field.name] =
                        checked
                            ? checked.value
                            : null;

                    return;
                }


                result[field.name] =
                    elements.value;

            });


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


            if (!container) {

                container =
                    document.createElement("div");

                container.className =
                    "am-modal-toast-container";

                document.body.appendChild(
                    container
                );
            }


            const toast =
                document.createElement("div");

            toast.className =
                "am-modal-toast";


            if (options.icon) {

                const icon =
                    document.createElement("div");

                icon.className =
                    "am-modal-icon " +
                    "am-modal-icon-" +
                    options.icon;

                icon.textContent =
                    this.icons[options.icon] ||
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
                document.createElement("div");

            text.className =
                "am-modal-toast-text";

            text.textContent =
                options.text || "";

            toast.appendChild(
                text
            );


            container.appendChild(
                toast
            );


            const duration =
                options.duration || 3000;


            setTimeout(() => {

                toast.style.opacity =
                    "0";

                toast.style.transform =
                    "translateY(-8px)";

                toast.style.transition =
                    ".25s ease";


                setTimeout(() => {

                    toast.remove();

                    if (
                        container.children.length ===
                        0
                    ) {

                        container.remove();
                    }

                }, 250);

            }, duration);


            return toast;
        }
    };


    /* =========================================================
       GLOBAL
    ========================================================= */

    window.AMModal =
        AMModal;


})(window, document);
