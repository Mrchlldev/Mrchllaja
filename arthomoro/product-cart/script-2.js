/* =========================================================
   AM PRODUCT SYSTEM V2
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

        }).format(
            Number(number) || 0
        );

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
       GET PRODUCT
       
       V2:
       Produk langsung berasal dari:
       
       const product = {...}
       
       Tidak membutuhkan:
       [data-am-product]
    ===================================================== */

    function getCurrentProduct() {

        if (
            typeof window.product === "object" &&
            window.product !== null
        ) {

            return window.product;

        }

        return null;

    }


    /* =====================================================
       VALIDATE PRODUCT
    ===================================================== */

    function validateProduct(product) {

        if (!product) {
            return false;
        }


        if (
            typeof product.name !== "string" ||
            !product.name.trim()
        ) {

            return false;

        }


        if (
            product.price === undefined ||
            product.price === null ||
            isNaN(Number(product.price))
        ) {

            return false;

        }


        return true;

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

        try {

            localStorage.setItem(

                AMProductSystem.storageKey,

                JSON.stringify(cart)

            );


            updateCartCount();


            document.dispatchEvent(

                new CustomEvent(
                    "amCartUpdated",
                    {
                        detail: {
                            cart: cart
                        }
                    }
                )

            );


        } catch (error) {

            console.error(
                "AM Cart Save:",
                error
            );

        }

    }


    /* =====================================================
       CART COUNT
    ===================================================== */

    function getCartCount() {

        return getCart().reduce(

            function (total, item) {

                return (

                    total +

                    Number(
                        item.quantity || 0
                    )

                );

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

    }


    /* =====================================================
       NORMALIZE VARIANT
    ===================================================== */

    function normalizeVariants(product) {

        if (
            !Array.isArray(
                product.variant
            )
        ) {

            return [];

        }


        return product.variant.filter(

            function (variant) {

                return (

                    variant &&

                    variant.name &&

                    Array.isArray(
                        variant.options
                    )

                );

            }

        );

    }


    /* =====================================================
       FIND VARIANT OPTION
    ===================================================== */

    function findVariantOption(

        product,
        variantName,
        value

    ) {

        const variants =
            normalizeVariants(
                product
            );


        const variant =
            variants.find(

                function (item) {

                    return (
                        String(
                            item.name
                        ) === String(
                            variantName
                        )
                    );

                }

            );


        if (!variant) {
            return null;
        }


        return variant.options.find(

            function (option) {

                return (

                    String(
                        option.value
                    ) === String(
                        value
                    )

                );

            }

        ) || null;

    }


    /* =====================================================
       GET VARIANT EXTRA PRICE
    ===================================================== */

    function getVariantExtraPrice(

        product,
        variantData

    ) {

        let extra = 0;


        const variants =
            normalizeVariants(
                product
            );


        variants.forEach(

            function (variant) {

                const selected =
                    variantData[
                        variant.name
                    ];


                if (
                    selected === undefined ||
                    selected === null ||
                    selected === ""
                ) {

                    return;

                }


                const option =
                    findVariantOption(

                        product,

                        variant.name,

                        selected

                    );


                if (!option) {
                    return;
                }


                /*
                 * Hanya angka yang dianggap
                 * sebagai tambahan harga.
                 *
                 * Tidak ada price = 0
                 */

                if (
                    option.price !== undefined &&
                    option.price !== null &&
                    !isNaN(
                        Number(
                            option.price
                        )
                    )
                ) {

                    extra +=
                        Number(
                            option.price
                        );

                }

            }

        );


        return extra;

    }


    /* =====================================================
       GET PRODUCT PRICE
    ===================================================== */

    function getProductPrice(

        product,
        variantData

    ) {

        return (

            Number(
                product.price
            ) +

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

                            String(key) +

                            "=" +

                            String(
                                variantData[key]
                            )

                        );

                    }

                )

                .join("|");


        return (

            String(
                product.name
            ) +

            "::" +

            variants +

            "::" +

            String(
                note || ""
            )

        );

    }


    /* =====================================================
       BUILD VARIANT FIELDS
    ===================================================== */

    function buildVariantFields(product) {

        const fields = [];


        const variants =
            normalizeVariants(
                product
            );


        variants.forEach(

            function (variant, index) {

                const options =
                    variant.options
                        .filter(

                            function (option) {

                                return (

                                    option &&

                                    option.value !==
                                        undefined &&

                                    option.value !==
                                        null

                                );

                            }

                        )
                        .map(

                            function (option) {

                                let label =
                                    option.label !==
                                    undefined

                                        ? option.label

                                        : option.value;


                                /*
                                 * Jika ada price,
                                 * tampilkan tambahan harga.
                                 */

                                if (
                                    option.price !==
                                        undefined &&
                                    option.price !==
                                        null &&
                                    !isNaN(
                                        Number(
                                            option.price
                                        )
                                    ) &&
                                    Number(
                                        option.price
                                    ) !== 0
                                ) {

                                    const price =
                                        Number(
                                            option.price
                                        );


                                    if (price > 0) {

                                        label +=
                                            " (+" +
                                            formatPrice(
                                                price
                                            ) +
                                            ")";

                                    } else {

                                        label +=
                                            " (" +
                                            formatPrice(
                                                price
                                            ) +
                                            ")";

                                    }

                                }


                                return {

                                    value:
                                        option.value,

                                    label:
                                        label

                                };

                            }

                        );


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
                        options

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


        const variants =
            normalizeVariants(
                product
            );


        variants.forEach(

            function (variant, index) {

                const value =
                    data[
                        "am_variant_" +
                        index
                    ];


                if (
                    value !== undefined &&
                    value !== null &&
                    value !== ""
                ) {

                    result[
                        variant.name
                    ] = value;

                }

            }

        );


        return result;

    }


    /* =====================================================
       BUILD STORED VARIANT DATA
       
       Menyimpan juga extra price supaya
       cart.html tidak perlu punya config produk.
    ===================================================== */

    function buildStoredVariantData(

        product,
        variantData

    ) {

        const variants =
            normalizeVariants(
                product
            );


        return variants.map(

            function (variant) {

                const selected =
                    variantData[
                        variant.name
                    ];


                const option =
                    findVariantOption(

                        product,

                        variant.name,

                        selected

                    );


                return {

                    name:
                        variant.name,

                    value:
                        selected,

                    label:
                        option
                            ? (
                                option.label !==
                                undefined

                                    ? option.label

                                    : option.value
                            )
                            : selected,

                    price:
                        option &&
                        option.price !==
                            undefined &&
                        option.price !==
                            null &&
                        !isNaN(
                            Number(
                                option.price
                            )
                        )

                            ? Number(
                                option.price
                            )

                            : 0

                };

            }

        );

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


        const variantExtraPrice =
            getVariantExtraPrice(

                product,

                variantData

            );


        const unitPrice =
            Number(
                product.price
            ) +
            variantExtraPrice;


        const storedVariants =
            buildStoredVariantData(

                product,

                variantData

            );


        const existing =
            cart.find(

                function (item) {

                    return (
                        item.id === id
                    );

                }

            );


        if (existing) {

            existing.quantity =
                Number(
                    existing.quantity || 0
                ) +
                Number(quantity);


        } else {

            cart.push({

                id:
                    id,

                name:
                    product.name,

                img:
                    product.img || "",

                basePrice:
                    Number(
                        product.price
                    ),

                variantExtraPrice:
                    variantExtraPrice,

                price:
                    unitPrice,

                variant:
                    variantData,

                variantDetails:
                    storedVariants,

                quantity:
                    Number(quantity),

                note:
                    note || ""

            });

        }


        saveCart(cart);


        return true;

    }


    /* =====================================================
       OPEN PRODUCT FORM
    ===================================================== */

    function openProductForm(

        product,
        mode

    ) {

        if (
            !validateProduct(
                product
            )
        ) {

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


        /*
         * JUMLAH
         */

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


        /*
         * CATATAN
         */

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

                    ? "Beli " +
                      product.name

                    : "Tambah ke Keranjang",


            fields:
                fields,
            confirmButtonText: mode === "buy" ? "Beli" : "Tambahkan",


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
                     * ==================================
                     * ADD TO CART
                     * ==================================
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
                     * ==================================
                     * BUY DIRECT
                     * ==================================
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

                const price =
                    getStoredItemPrice(
                        item
                    );


                const quantity =
                    Number(
                        item.quantity || 0
                    );


                const subtotal =
                    price *
                    quantity;


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
                    quantity +
                    "%0A";


                /*
                 * VARIANT
                 */

                if (
                    Array.isArray(
                        item.variantDetails
                    ) &&
                    item.variantDetails.length
                ) {

                    item.variantDetails.forEach(

                        function (variant) {

                            message +=
                                encodeURIComponent(
                                    variant.name
                                ) +
                                ": " +
                                encodeURIComponent(
                                    variant.label
                                ) +
                                "%0A";

                        }

                    );

                } else if (
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


                /*
                 * CATATAN
                 */

                if (item.note) {

                    message +=
                        "Catatan: " +
                        encodeURIComponent(
                            item.note
                        ) +
                        "%0A";

                }


                /*
                 * HARGA
                 */

                message +=
                    "Harga: " +
                    encodeURIComponent(
                        formatPrice(
                            price
                        )
                    ) +
                    "%0A";


                message +=
                    "Subtotal: " +
                    encodeURIComponent(
                        formatPrice(
                            subtotal
                        )
                    ) +
                    "%0A%0A";

            }

        );


        message +=
            "*TOTAL: " +
            encodeURIComponent(
                formatPrice(
                    total
                )
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
       GET STORED ITEM PRICE
    ===================================================== */

    function getStoredItemPrice(item) {

        /*
         * V2 menyimpan harga final item.
         */

        if (
            item.price !== undefined &&
            !isNaN(
                Number(
                    item.price
                )
            )
        ) {

            return Number(
                item.price
            );

        }


        /*
         * Fallback untuk cart lama.
         */

        return (

            Number(
                item.basePrice ||
                0
            ) +

            Number(
                item.variantExtraPrice ||
                0
            )

        );

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


            updateCartCount();

            return;

        }


        let total = 0;


        let html =
            `<div class="am-cart-list">`;


        cart.forEach(

            function (item, index) {

                const price =
                    getStoredItemPrice(
                        item
                    );


                const quantity =
                    Number(
                        item.quantity || 0
                    );


                const subtotal =
                    price *
                    quantity;


                total +=
                    subtotal;


                let variantHTML =
                    "";


                /*
                 * V2:
                 * Gunakan variantDetails
                 */

                if (
                    Array.isArray(
                        item.variantDetails
                    ) &&
                    item.variantDetails.length
                ) {

                    variantHTML =

                        item.variantDetails

                            .map(

                                function (variant) {

                                    return (

                                        escapeHTML(
                                            variant.name
                                        ) +

                                        ": " +

                                        escapeHTML(
                                            variant.label
                                        )

                                    );

                                }

                            )

                            .join(" • ");


                } else if (
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

                                        escapeHTML(
                                            key
                                        ) +

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

                    <div
                        class="am-cart-item"
                        data-am-cart-item="${index}"
                    >

                        <div class="am-cart-item-image">

                            <img
                                src="${escapeHTML(
                                    item.img || ""
                                )}"
                                alt="${escapeHTML(
                                    item.name
                                )}"
                            >

                        </div>


                        <div class="am-cart-item-info">

                            <h3 class="am-cart-item-name">
                                ${escapeHTML(
                                    item.name
                                )}
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
                                            ${escapeHTML(
                                                item.note
                                            )}
                                        </p>
                                    `
                                    : ""
                            }


                            <div class="am-cart-item-price">

                                ${formatPrice(
                                    price
                                )}

                            </div>


                            <div class="am-cart-item-subtotal">

                                Subtotal:
                                ${formatPrice(
                                    subtotal
                                )}

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


                                <span
                                    class="am-cart-quantity-value"
                                >
                                    ${quantity}
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
                        ${formatPrice(
                            total
                        )}
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


        updateCartCount();

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


        const current =
            Number(
                cart[index].quantity || 0
            );


        cart[index].quantity =
            current +
            Number(amount);


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
       DELETE CART ITEM
    ===================================================== */

    function deleteCartItem(index) {

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
       CLEAR CART
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
       WHATSAPP OPEN
    ===================================================== */

    function openWhatsApp(message) {

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
       EVENTS
    ===================================================== */

    document.addEventListener(

        "click",

        function (event) {

            /*
             * ==============================================
             * BUY
             * ==============================================
             */

            const buy =
                event.target.closest(
                    "[data-am-product-buy]"
                );


            if (buy) {

                const product =
                    getCurrentProduct();


                openProductForm(

                    product,

                    "buy"

                );


                return;

            }


            /*
             * ==============================================
             * ADD TO CART
             * ==============================================
             */

            const cartButton =
                event.target.closest(
                    "[data-am-product-cart]"
                );


            if (cartButton) {

                const product =
                    getCurrentProduct();


                openProductForm(

                    product,

                    "cart"

                );


                return;

            }


            /*
             * ==============================================
             * MINUS
             * ==============================================
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
             * ==============================================
             * PLUS
             * ==============================================
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
             * ==============================================
             * DELETE
             * ==============================================
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
             * ==============================================
             * CHECKOUT
             * ==============================================
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
             * ==============================================
             * CLEAR
             * ==============================================
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
       STORAGE EVENT
       
       Berguna jika cart dibuka di tab lain.
    ===================================================== */

    window.addEventListener(

        "storage",

        function (event) {

            if (
                event.key ===
                AMProductSystem.storageKey
            ) {

                updateCartCount();

                renderCart();

            }

        }

    );


    /* =====================================================
       INIT
    ===================================================== */

    function init() {

        /*
         * V2 TIDAK MERENDER PRODUK.
         *
         * Halaman produk hanya menyediakan:
         *
         * const product = {...}
         *
         * dan button.
         */


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

        getProduct:
            getCurrentProduct,

        getProductPrice:
            getProductPrice,

        addToCart:
            addProductToCart,

        renderCart:
            renderCart,

        updateCartCount:
            updateCartCount,

        clearCart:
            clearCart,

        openProductForm:
            openProductForm

    };


    /* =====================================================
       START
    ===================================================== */

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
