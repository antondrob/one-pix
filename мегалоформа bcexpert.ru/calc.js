(function() {

    // Инициализация элементов управления формы
    // селекты
    jQuery('#organization-legal-form').selectmenu();
    jQuery('#tax-system').selectmenu();
    jQuery('#bank-client').selectmenu();

    // Чекбоксы
    jQuery('#special-activities').checkboxradio({ icon: false });
    jQuery('#foreign-economic-activities').checkboxradio({ icon: false });
    jQuery('#several-activities').checkboxradio({ icon: false });
    jQuery('#reporting-losses').checkboxradio({ icon: false });
    jQuery('#envd-usage').checkboxradio({ icon: false });
    jQuery('#background-envd-usage').checkboxradio({ icon: false });
    jQuery("#main-cash-book").checkboxradio({ icon: false });
    jQuery('#reports-on-paper').checkboxradio({ icon: false });
    jQuery('#need-tax-analysis').checkboxradio({ icon: false });
    jQuery('#urgency-document-preparation').checkboxradio({ icon: false });
    jQuery('#hourly-wage').checkboxradio({ icon: false });
    jQuery('#wage-twice-month').checkboxradio({ icon: false });
    jQuery('#nds-agent-report').checkboxradio({ icon: false });
    jQuery('#transport-tax').checkboxradio({ icon: false });
    jQuery('#mineral-mining-tax').checkboxradio({ icon: false });
    jQuery('#year-moj-report').checkboxradio({ icon: false });
    jQuery("#land-tax").checkboxradio({ icon: false });    
    jQuery('#dividends').checkboxradio({ icon: false });
    
    // спиннеры
    jQuery("#rus-employees-count").spinner();
    jQuery("#foreign-employees-count").spinner();
    jQuery("#envd-points-count").spinner();
    jQuery("#separate-subdivision").spinner();
    jQuery("#monthly-turnover").spinner();
    jQuery("#rub-account-count").spinner();
    jQuery("#account-actions").spinner();
    jQuery("#payments-count").spinner();
    jQuery("#rub-account-turnover").spinner();
    jQuery("#foreign-account-count").spinner();
    jQuery("#foreign-account-actions").spinner();
    jQuery("#foreign-account-payments").spinner();
    jQuery("#foreign-account-turnover").spinner();
    jQuery("#bank-actions-count").spinner();
    jQuery("#cash-register-count").spinner();
    jQuery("#cash-book-count").spinner();
    jQuery("#cash-terminal-count").spinner();
    jQuery("#courier-tours-count").spinner();
    jQuery("#server-accounts-count").spinner();
    jQuery("#document-count").spinner();
    jQuery("#documents-in-1c").spinner();
    jQuery("#documents-by-contractor").spinner();
    jQuery("#waybill-count").spinner();
    jQuery("#mission-count").spinner();
    jQuery("#salary-count").spinner();
    jQuery("#foreign-salary-count").spinner();
    jQuery("#decree-count").spinner();
    jQuery("#sick-list-count").spinner();
    jQuery("#tax-inspections-count").spinner();
    jQuery("#refund-amount").spinner();
    jQuery("#ks2-ks3-count").spinner();
    jQuery("#main-assets-count").spinner();
    jQuery("#pap-reports-count").spinner();
    jQuery("#reporting-forms").spinner();
    jQuery("#reporting-kvartal").spinner();
    jQuery("#reporting-year").spinner();
    jQuery("#property-tax").spinner();
    jQuery("#audit-docs-count").spinner();
    jQuery("#tax-inspection-letters").spinner();
    jQuery("#dividends-beneficiary").spinner();

    // для работы валидаторов задаем переменные
    // форма
    var form = jQuery('#calculator');
    var btn_submit = form.find('#btn-submit');
    var btn_reset = form.find('#btn-reset');
    
    // поля с которыми работает JS (скрывающиеся)
    var envdUsage = jQuery('#envd-usage');
    var envdPointsCountBlock = jQuery('#envd-points-count').parents('.calculator__wrapper');
    var backgroundEnvdUsageBlock = jQuery('#background-envd-usage').parents('.calculator__wrapper');

    console.clear();

    // Всем селектам даем класс "незаполненный"
    function setEmptyFields() {
        jQuery('select').each(function() {
            if (!jQuery(this).parents('.calculator__wrapper').hasClass('hidden'))
                jQuery(this).addClass('empty-field');
        });
    }

    // Функция проверки полей формы
    function checkFields() {
        jQuery('.empty-field').each(function() {
            // Удаляем и добавляем класс-указание на пустоту поля
            if(jQuery(this).val())
                jQuery(this).removeClass('empty-field');
            else
                jQuery(this).addClass('empty-field');
        });
    }

    // Функция подсветки незаполненных полей
    function lightEmptyFields() {
        // Мы их подсвечиваем
        jQuery('.empty-field').parents('.calculator__wrapper').css('background-color','#fbe1e1');
        // Экран прокручиваем до первой ошибки 
        jQuery('html, body').animate({
            scrollTop: jQuery('select.empty-field:first').parents('.calculator__wrapper')[0].offsetTop
        });
    }

    
    setEmptyFields(); // устанавливаем поля пустыми (первоначальная инициализация)

    
    // Проверка в режиме реального времени
    setInterval(function(){
        // Запускаем функцию проверки полей на заполненность
        checkFields();
        // Считаем к-во незаполненных полей
        var sizeEmpty = form.find('.empty-field').length;
        // console.log(sizeEmpty);
        // Условие-тригер на кнопку отправки формы
        if(sizeEmpty > 0) {
            if(btn_submit.hasClass('disabled')) {
                return false
            } else {
                btn_submit.addClass('disabled')
            }
        } else {
            btn_submit.removeClass('disabled')
        }
    },500);


    // Запрет на ввод букв в поля "только числа"
    jQuery("input[min=0]").on("change keyup input click", function() {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });


    jQuery('.calculator__label').on('click', function(e) {
        e.preventDefault();
    });
    
    // Работа Checkbox'а (анимация изменения цвета и текста)
    jQuery('.checkbox-label').on('click', function() {
        if(jQuery(this).html()=="Нет")
            jQuery(this).html("Да");
        else
            jQuery(this).html("Нет");
        
        jQuery(this).toggleClass('.ui-checkboxradio-checked');
        jQuery(this).toggleClass('.ui-state-active');
    })


    // сброс стилей оформления при изменении "незаполненного" селекта
    jQuery('.empty-field').selectmenu({
        change: function(event, ui) {        
            if(ui.item.element.val())
                ui.item.element.parents('.calculator__wrapper').removeAttr('style');
        }
    });

    // появление полей блока ЕНВД/*
    envdUsage.on('change', function() {

        // console.log(envdUsage.prop('checked'));

        var envdUsageAddFields = jQuery('.envd-usage');

        switch(envdUsage.prop('checked')) {
            case true: {
                envdUsageAddFields.css('display', 'flex');
                break;
            }
            default: {
                envdUsageAddFields.css('display','none');
                jQuery('#envd-points-count').val(0);
                envdUsageAddFields.find('input[type=checkbox]').prop('checked',false);
                envdUsageAddFields.find('input[type=checkbox]').checkboxradio("refresh");
                break;
            }
        }       
    });


    

    // появление полей блока БАНК-КЛИЕНТ
    jQuery('#bank-client').selectmenu({
        change: function(event, ui) {

            // console.log(ui);
            switch (ui.item.value) {
                case "1": {
                    // console.log('силами заказчика');
                    jQuery('.banking-by-contractor').css('display','none');
                    jQuery('.banking-by-contractor').find('input').val(0);
                    jQuery('.banking-by-customer').css('display','flex');
                    break;
                }
                case "2": {
                    // console.log('силами исполнителя');
                    jQuery('.banking-by-customer').css('display','none');
                    jQuery('.banking-by-customer').find('input').val(0);
                    jQuery('.banking-by-contractor').css('display','flex');
                    break;
                }
            }
        }
    });


    // появление блока сопряженного с лицензиями 1c
    jQuery('#server-accounts-count').on("spinchange", function(event, ui) {
        // var block = jQuery('.documents-in-1c');
        if (jQuery(this).val() > 0) {
            jQuery('.documents-in-1c').css('display', 'flex');
        } else {
            jQuery('.documents-in-1c').find('input').val(0);
            jQuery('.documents-in-1c').css('display', 'none');
        }

    });    


    // Событие клика по кнопке отправить
    jQuery('#calculator').on('submit', function(e){
        e.preventDefault();

        var data = jQuery(this).serialize();

        if(jQuery(this).find('input[type=submit]').hasClass('disabled')){
            // Класс disabled на кнопке означает что есть назаполненные поля            
            lightEmptyFields();            
            return false;
        } else {
            // Все заполнено - отправляем форму
            jQuery.ajax({
                url: "php_handler.php",
                type: "POST",
                data: data,
                success: function(data) {
                    // console.log('отправка AJAX');
                    // console.log(data);
                }
            });
        }
    });


    // сброс формы по кнопке
    btn_reset.click(function(e){
        e.preventDefault();
        // установка классов пустоты
        setEmptyFields();
        // сброс стилей оформления
        form.find('select, input').each(function() {
            jQuery(this).parents('.calculator__wrapper').removeAttr('style');
        });
        form[0].reset();
    });


    // открытие и закрытие всплывающей подсказки
    jQuery('.helper').on('click', function(e) {
        e.preventDefault();
        jQuery('.helper-text').fadeOut(300);

        if(jQuery(this).find('.helper-text').css('display') != 'block')
            jQuery(this).find('.helper-text').fadeIn(300);
        else
            jQuery(this).find('.helper-text').fadeOut(300);
    });

    jQuery('label').on('click', function(e) {
        // e.preventDefault();
    });

    // закрытие всплывающей подсказки при нажатии на нее саму
    jQuery('.helper-text').on('click', function() {
        jQuery(this).fadeOut(300);
    });
}());