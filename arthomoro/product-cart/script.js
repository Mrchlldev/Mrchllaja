/* =========================================================
   AM PRODUCT SYSTEM
   Single Product Page + Cart
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       GLOBAL CONFIG
    ===================================================== */

    const AMProductSystem = {

        storageKey: "am_cart",

        whatsapp: "6281234567890"

    };


    /* =====================================================
       FORMAT RUPIAH
    ===================================================== */

    function formatPrice(number) {

        return new Intl.NumberFormat("id-ID", {

            style: "currency",

            currency: "IDR",

            minimumFractionDigits: 0

        }).format(Number(number) || 0);

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value ?? "")

            .replace(/&/g, "&amp;")

            .replace(/</g, "&lt;")

            .replace(/>/g, "&gt;")

            .replace(/"/g, "&quot;")

            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       GET CART
    ===================================================== */

    function getCart() {

        try {

            const data =
                localStorage.getItem(
                    AMProductSystem.storageKey
                );

            if (!data) {
                return [];
            }

            const cart =
                JSON.parse(data);

            return Array.isArray(cart)
                ? cart
                : [];

        } catch (error) {

            console.error(
                "AM Cart:",
                error
            );

            return [];

        }

    }


    /* =====================================================
       SAVE CART
    ===================================================== */

    function saveCart(cart) {

        localStorage.setItem(

            AMProductSystem.storageKey,

            JSON.stringify(cart)

        );

        updateCartCount();

    }


    /* =====================================================
       CART COUNT
    ===================================================== */

    function getCartCount() {

        return getCart().reduce(

            function (total, item) {

                return total +
                    Number(item.quantity || 0);

            },

            0

        );

    }


    function updateCartCount() {

        const elements =
            document.querySelectorAll(
                "[data-am-cart-count]"
            );

        const count =
            getCartCount();


        elements.forEach(
            function (element) {

                element.textContent =
                    count;

            }
        );


        document.dispatchEvent(

            new CustomEvent(
                "amCartUpdated",
                {
                    detail: {
                        count: count
                    }
                }
            )

        );

    }


    /* =====================================================
       FIND PRODUCT VARIANT EXTRA PRICE
    ===================================================== */

    function getVariantExtraPrice(
        product,
        variantData
    ) {

        let extra = 0;


        if (
            !Array.isArray(
                product.variant
            )
        ) {

            return 0;

        }


        product.variant.forEach(

            function (variant) {

                const selected =
                    variantData[
                        variant.name
                    ];


                if (!selected) {
                    return;
                }


                if (
                    !Array.isArray(
                        variant.options
                    )
                ) {

                    return;

                }


                const option =
                    variant.options.find(

                        function (option) {

                            return String(
                                option.value
                            ) === String(
                                selected
                            );

                        }

                    );


                if (
                    option &&
                    typeof option.price ===
                    "number"
                ) {

                    extra +=
                        option.price;

                }

            }

        );


        return extra;

    }


    /* =====================================================
       PRODUCT PRICE
    ===================================================== */

    function getProductPrice(
        product,
        variantData
    ) {

        return (

            Number(product.price) +

            getVariantExtraPrice(
                product,
                variantData
            )

        );

    }


    /* =====================================================
       CREATE CART ID
    ===================================================== */

    function createCartId(
        product,
        variantData,
        note
    ) {

        const variants =

            Object.keys(
                variantData || {}
            )

                .sort()

                .map(
                    function (key) {

                        return (
                            key +
                            "=" +
                            variantData[key]
                        );

                    }
                )

                .join("|");


        return (

            product.name +

            "::" +

            variants +

            "::" +

            String(note || "")

        );

    }


    /* =====================================================
       BUILD VARIANT FIELDS
    ===================================================== */

    function buildVariantFields(product) {

        const fields = [];


        if (
            !Array.isArray(
                product.variant
            )
        ) {

            return fields;

        }


        product.variant.forEach(

            function (variant, index) {

                if (
                    !variant ||
                    !variant.name ||
                    !Array.isArray(
                        variant.options
                    )
                ) {

                    return;

                }


                fields.push({

                    type: "select",

                    name:
                        "am_variant_" +
                        index,

                    label:
                        variant.name,

                    placeholder:
                        "Pilih " +
                        variant.name,

                    required: true,

                    options:
                        variant.options.map(

                            function (option) {

                                let label =
                                    option.label;


                                if (
                                    typeof option.price ===
                                    "number" &&
                                    option.price > 0
                                ) {

                                    label +=
                                        " (+" +
                                        formatPrice(
                                            option.price
                                        ) +
                                        ")";

                                }


                                return {

                                    value:
                                        option.value,

                                    label:
                                        label

                                };

                            }

                        )

                });

            }

        );


        return fields;

    }


    /* =====================================================
       READ VARIANT DATA
    ===================================================== */

    function readVariantData(
        product,
        data
    ) {

        const result = {};


        if (
            !Array.isArray(
                product.variant
            )
        ) {

            return result;

        }


        product.variant.forEach(

            function (variant, index) {

                result[
                    variant.name
                ] =
                    data[
                        "am_variant_" +
                        index
                    ];

            }

        );


        return result;

    }


    /* =====================================================
       ADD PRODUCT TO CART
    ===================================================== */

    function addProductToCart(
        product,
        variantData,
        quantity,
        note
    ) {

        const cart =
            getCart();


        const id =
            createCartId(
                product,
                variantData,
                note
            );


        const existing =
            cart.find(
                function (item) {

                    return item.id === id;

                }
            );


        if (existing) {

            existing.quantity +=
                quantity;

        } else {

            cart.push({

                id: id,

                name:
                    product.name,

                price:
                    Number(product.price),

                img:
                    product.img,

                variant:
                    variantData,

                quantity:
                    quantity,

                note:
                    note || ""

            });

        }


        saveCart(cart);

    }


    /* =====================================================
       OPEN PRODUCT FORM
    ===================================================== */

    function openProductForm(
        product,
        mode
    ) {

        if (!product) {

            AMModal.toast({

                icon: "error",

                text:
                    "Produk tidak ditemukan."

            });

            return;

        }


        const fields =
            buildVariantFields(
                product
            );


        fields.push({

            type: "number",

            name: "quantity",

            label: "Jumlah",

            placeholder:
                "Masukkan jumlah",

            required: true,

            value: 1,

            min: 1

        });


        fields.push({

            type: "textarea",

            name: "note",

            label: "Catatan",

            placeholder:
                "Tulis catatan kamu...",

            required: false,

            rows: 5,

            help:
                "Catatan bersifat opsional."

        });


        AMModal.form({

            title:
                mode === "buy"
                    ? "Beli " + product.name
                    : "Tambah ke Keranjang",


            fields:
                fields,


            onSubmit:
                function (data) {

                    const variantData =
                        readVariantData(
                            product,
                            data
                        );


                    const quantity =
                        Math.max(

                            1,

                            parseInt(
                                data.quantity,
                                10
                            ) || 1

                        );


                    const note =
                        String(
                            data.note || ""
                        ).trim();


                    /*
                     * ======================================
                     * TAMBAH KE KERANJANG
                     * ======================================
                     */

                    if (
                        mode === "cart"
                    ) {

                        addProductToCart(

                            product,

                            variantData,

                            quantity,

                            note

                        );


                        AMModal.toast({

                            icon: "success",

                            text:
                                "Produk berhasil ditambahkan ke keranjang."

                        });


                        return;

                    }


                    /*
                     * ======================================
                     * BELI LANGSUNG
                     * ======================================
                     */

                    const price =
                        getProductPrice(

                            product,

                            variantData

                        );


                    const total =
                        price *
                        quantity;


                    AMModal.toast({

                        icon: "info",

                        text:
                            "Mengalihkan ke WhatsApp..."

                    });


                    sendDirectWhatsApp({

                        product:
                            product,

                        variantData:
                            variantData,

                        quantity:
                            quantity,

                        note:
                            note,

                        price:
                            price,

                        total:
                            total

                    });

                }

        });

    }


    /* =====================================================
       DIRECT WHATSAPP
    ===================================================== */

    function sendDirectWhatsApp(data) {

        let message =
            "Halo, saya ingin membeli:%0A%0A";


        message +=
            "*Produk:* " +
            encodeURIComponent(
                data.product.name
            ) +
            "%0A";


        message +=
            "*Jumlah:* " +
            data.quantity +
            "%0A";


        if (
            data.variantData &&
            Object.keys(
                data.variantData
            ).length
        ) {

            message +=
                "%0A*Varian:*%0A";


            Object.keys(
                data.variantData
            ).forEach(

                function (key) {

                    message +=
                        "- " +
                        encodeURIComponent(
                            key
                        ) +
                        ": " +
                        encodeURIComponent(
                            data.variantData[key]
                        ) +
                        "%0A";

                }

            );

        }


        if (data.note) {

            message +=
                "%0A*Catatan:*%0A" +
                encodeURIComponent(
                    data.note
                ) +
                "%0A";

        }


        message +=
            "%0A*Harga:* " +
            encodeURIComponent(
                formatPrice(
                    data.price
                )
            );


        message +=
            "%0A*Total:* " +
            encodeURIComponent(
                formatPrice(
                    data.total
                )
            );


        openWhatsApp(
            message
        );

    }


    /* =====================================================
       CART WHATSAPP
    ===================================================== */

    function sendCartWhatsApp() {

        const cart =
            getCart();


        if (!cart.length) {

            AMModal.toast({

                icon: "warning",

                text:
                    "Keranjang masih kosong."

            });

            return;

        }


        let total = 0;


        let message =
            "Halo, saya ingin memesan:%0A%0A";


        cart.forEach(

            function (item, index) {

                const variantExtra =
                    getStoredVariantExtra(
                        item
                    );


                const price =
                    Number(item.price) +
                    variantExtra;


                const subtotal =
                    price *
                    Number(item.quantity);


                total +=
                    subtotal;


                message +=
                    "*" +
                    (index + 1) +
                    ". " +
                    encodeURIComponent(
                        item.name
                    ) +
                    "*%0A";


                message +=
                    "Jumlah: " +
                    item.quantity +
                    "%0A";


                if (
                    item.variant &&
                    Object.keys(
                        item.variant
                    ).length
                ) {

                    Object.keys(
                        item.variant
                    ).forEach(

                        function (key) {

                            message +=
                                encodeURIComponent(
                                    key
                                ) +
                                ": " +
                                encodeURIComponent(
                                    item.variant[key]
                                ) +
                                "%0A";

                        }

                    );

                }


                if (item.note) {

                    message +=
                        "Catatan: " +
                        encodeURIComponent(
                            item.note
                        ) +
                        "%0A";

                }


                message +=
                    "Harga: " +
                    encodeURIComponent(
                        formatPrice(price)
                    ) +
                    "%0A";


                message +=
                    "Subtotal: " +
                    encodeURIComponent(
                        formatPrice(subtotal)
                    ) +
                    "%0A%0A";

            }

        );


        message +=
            "*TOTAL: " +
            encodeURIComponent(
                formatPrice(total)
            ) +
            "*";


        AMModal.toast({

            icon: "info",

            text:
                "Mengalihkan ke WhatsApp..."

        });


        openWhatsApp(
            message
        );

    }


    /* =====================================================
       STORED VARIANT EXTRA
    ===================================================== */

    function getStoredVariantExtra(
        item
    ) {

        /*
         * Produk diambil dari config halaman
         * jika tersedia.
         *
         * Tetapi keranjang.html dapat memiliki
         * registry produk tambahan.
         */

        const product =
            findProductFromRegistry(
                item
            );


        if (!product) {

            /*
             * Kalau data harga variant sudah
             * disimpan di item, gunakan nilai
             * tersebut.
             */

            return Number(
                item.variantExtraPrice || 0
            );

        }


        return getVariantExtraPrice(

            product,

            item.variant || {}

        );

    }


    /* =====================================================
       PRODUCT REGISTRY
    ===================================================== */

    function findProductFromRegistry(
        item
    ) {

        if (
            Array.isArray(
                window.AMProducts
            )
        ) {

            const found =
                window.AMProducts.find(

                    function (product) {

                        return (
                            product.name ===
                            item.name
                        );

                    }

                );


            if (found) {
                return found;
            }

        }


        if (
            window.product &&
            window.product.name ===
            item.name
        ) {

            return window.product;

        }


        return null;

    }


    /* =====================================================
       WHATSAPP OPEN
    ===================================================== */

    function openWhatsApp(
        message
    ) {

        const phone =
            String(
                AMProductSystem.whatsapp
            )
                .replace(
                    /\D/g,
                    ""
                );


        if (!phone) {

            AMModal.toast({

                icon: "error",

                text:
                    "Nomor WhatsApp belum dikonfigurasi."

            });

            return;

        }


        const url =
            "https://wa.me/" +
            phone +
            "?text=" +
            message;


        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    }


    /* =====================================================
       RENDER SINGLE PRODUCT
    ===================================================== */

    function renderProduct() {

        const container =
            document.querySelector(
                "[data-am-product]"
            );


        if (!container) {
            return;
        }


        const product =
            window.product;


        if (!product) {

            container.innerHTML = "";

            return;

        }


        container.innerHTML = `

            <div class="am-product-container">

                <div class="am-product-image">

                    <img
                        src="${escapeHTML(product.img)}"
                        alt="${escapeHTML(product.name)}"
                    >

                </div>


                <div class="am-product-info">

                    <h1 class="am-product-name">
                        ${escapeHTML(product.name)}
                    </h1>


                    <div class="am-product-price">
                        ${formatPrice(product.price)}
                    </div>


                    ${
                        product.description
                            ? `
                                <div class="am-product-description">
                                    ${escapeHTML(
                                        product.description
                                    )}
                                </div>
                            `
                            : ""
                    }


                    <div class="am-product-buttons">

                        <button
                            type="button"
                            class="am-product-button am-product-button-buy"
                            data-am-product-buy
                        >
                            Beli
                        </button>


                        <button
                            type="button"
                            class="am-product-button am-product-button-cart"
                            data-am-product-cart
                        >
                            Tambahkan ke Keranjang
                        </button>

                    </div>

                </div>

            </div>

        `;

    }


    /* =====================================================
       RENDER CART
    ===================================================== */

    function renderCart() {

        const container =
            document.querySelector(
                "[data-am-cart]"
            );


        if (!container) {
            return;
        }


        const cart =
            getCart();


        if (!cart.length) {

            container.innerHTML = `

                <div class="am-cart-empty">

                    <h3 class="am-cart-empty-title">
                        Keranjang masih kosong
                    </h3>

                    <p class="am-cart-empty-text">
                        Belum ada produk yang ditambahkan.
                    </p>

                </div>

            `;

            return;

        }


        let total = 0;


        let html =
            `<div class="am-cart-list">`;


        cart.forEach(

            function (item, index) {

                const variantExtra =
                    getStoredVariantExtra(
                        item
                    );


                const price =
                    Number(item.price) +
                    variantExtra;


                const subtotal =
                    price *
                    Number(item.quantity);


                total +=
                    subtotal;


                let variantHTML =
                    "";


                if (
                    item.variant &&
                    Object.keys(
                        item.variant
                    ).length
                ) {

                    variantHTML =
                        Object.keys(
                            item.variant
                        )
                            .map(

                                function (key) {

                                    return (
                                        escapeHTML(key) +
                                        ": " +
                                        escapeHTML(
                                            item.variant[key]
                                        )
                                    );

                                }

                            )
                            .join(" • ");

                }


                html += `

                    <div class="am-cart-item">

                        <div class="am-cart-item-image">

                            <img
                                src="${escapeHTML(item.img)}"
                                alt="${escapeHTML(item.name)}"
                            >

                        </div>


                        <div class="am-cart-item-info">

                            <h3 class="am-cart-item-name">
                                ${escapeHTML(item.name)}
                            </h3>


                            ${
                                variantHTML
                                    ? `
                                        <p class="am-cart-item-variant">
                                            ${variantHTML}
                                        </p>
                                    `
                                    : ""
                            }


                            ${
                                item.note
                                    ? `
                                        <p class="am-cart-item-note">
                                            Catatan:
                                            ${escapeHTML(item.note)}
                                        </p>
                                    `
                                    : ""
                            }


                            <div class="am-cart-item-price">

                                ${formatPrice(price)}

                            </div>

                        </div>


                        <div class="am-cart-item-actions">

                            <div class="am-cart-quantity">

                                <button
                                    type="button"
                                    class="am-cart-quantity-button"
                                    data-am-minus="${index}"
                                >
                                    −
                                </button>


                                <span class="am-cart-quantity-value">
                                    ${item.quantity}
                                </span>


                                <button
                                    type="button"
                                    class="am-cart-quantity-button"
                                    data-am-plus="${index}"
                                >
                                    +
                                </button>

                            </div>


                            <button
                                type="button"
                                class="am-cart-delete"
                                data-am-delete="${index}"
                            >
                                Hapus
                            </button>

                        </div>

                    </div>

                `;

            }

        );


        html += `
            </div>

            <div class="am-cart-summary">

                <div class="am-cart-total">

                    <span class="am-cart-total-label">
                        Total
                    </span>

                    <strong class="am-cart-total-value">
                        ${formatPrice(total)}
                    </strong>

                </div>


                <button
                    type="button"
                    class="am-cart-checkout"
                    data-am-checkout
                >
                    Checkout via WhatsApp
                </button>


                <button
                    type="button"
                    class="am-cart-clear"
                    data-am-clear
                >
                    Kosongkan Keranjang
                </button>

            </div>
        `;


        container.innerHTML =
            html;

    }


    /* =====================================================
       CHANGE QUANTITY
    ===================================================== */

    function changeQuantity(
        index,
        amount
    ) {

        const cart =
            getCart();


        if (!cart[index]) {
            return;
        }


        cart[index].quantity +=
            amount;


        if (
            cart[index].quantity <= 0
        ) {

            cart.splice(
                index,
                1
            );

        }


        saveCart(cart);

        renderCart();

    }


    /* =====================================================
       DELETE
    ===================================================== */

    function deleteCartItem(
        index
    ) {

        const cart =
            getCart();


        if (!cart[index]) {
            return;
        }


        cart.splice(
            index,
            1
        );


        saveCart(cart);

        renderCart();


        AMModal.toast({

            icon: "success",

            text:
                "Produk dihapus dari keranjang."

        });

    }


    /* =====================================================
       CLEAR
    ===================================================== */

    function clearCart() {

        const cart =
            getCart();


        if (!cart.length) {

            AMModal.toast({

                icon: "info",

                text:
                    "Keranjang sudah kosong."

            });

            return;

        }


        localStorage.removeItem(
            AMProductSystem.storageKey
        );


        updateCartCount();

        renderCart();


        AMModal.toast({

            icon: "success",

            text:
                "Keranjang berhasil dikosongkan."

        });

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    document.addEventListener(

        "click",

        function (event) {


            /*
             * BUY
             */

            const buy =
                event.target.closest(
                    "[data-am-product-buy]"
                );


            if (buy) {

                openProductForm(
                    window.product,
                    "buy"
                );

                return;

            }


            /*
             * CART
             */

            const cartButton =
                event.target.closest(
                    "[data-am-product-cart]"
                );


            if (cartButton) {

                openProductForm(
                    window.product,
                    "cart"
                );

                return;

            }


            /*
             * MINUS
             */

            const minus =
                event.target.closest(
                    "[data-am-minus]"
                );


            if (minus) {

                changeQuantity(

                    parseInt(
                        minus.dataset.amMinus,
                        10
                    ),

                    -1

                );

                return;

            }


            /*
             * PLUS
             */

            const plus =
                event.target.closest(
                    "[data-am-plus]"
                );


            if (plus) {

                changeQuantity(

                    parseInt(
                        plus.dataset.amPlus,
                        10
                    ),

                    1

                );

                return;

            }


            /*
             * DELETE
             */

            const remove =
                event.target.closest(
                    "[data-am-delete]"
                );


            if (remove) {

                deleteCartItem(

                    parseInt(
                        remove.dataset.amDelete,
                        10
                    )

                );

                return;

            }


            /*
             * CHECKOUT
             */

            const checkout =
                event.target.closest(
                    "[data-am-checkout]"
                );


            if (checkout) {

                sendCartWhatsApp();

                return;

            }


            /*
             * CLEAR
             */

            const clear =
                event.target.closest(
                    "[data-am-clear]"
                );


            if (clear) {

                clearCart();

                return;

            }

        }

    );


    /* =====================================================
       INIT
    ===================================================== */

    function init() {

        renderProduct();

        renderCart();

        updateCartCount();

    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.AMProduct = {

        formatPrice:
            formatPrice,

        getCart:
            getCart,

        getCartCount:
            getCartCount,

        addToCart:
            addProductToCart,

        renderCart:
            renderCart,

        updateCartCount:
            updateCartCount,

        clearCart:
            clearCart

    };


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }

})();
