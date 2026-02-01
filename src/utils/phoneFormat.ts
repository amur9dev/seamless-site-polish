/**
 * Утилита для форматирования номера телефона
 * Формат: +7 (XXX) XXX-XX-XX
 * 
 * Улучшенная версия с корректным удалением символов
 */

export const formatPhone = (value: string, prevValue?: string): string => {
  // Убираем все нецифровые символы
  let digits = value.replace(/\D/g, '');
  
  // Если пользователь стирает и дошёл до скобок — удаляем предыдущую цифру
  if (prevValue && value.length < prevValue.length) {
    // Получаем цифры из предыдущего значения
    const prevDigits = prevValue.replace(/\D/g, '');
    
    // Если количество цифр не изменилось (удалили только форматирование),
    // принудительно удаляем последнюю цифру
    if (digits.length === prevDigits.length && digits.length > 1) {
      digits = digits.slice(0, -1);
    }
  }
  
  // Ограничиваем длину до 11 цифр
  if (digits.length > 11) {
    digits = digits.substring(0, 11);
  }
  
  // Если начинается с 8, заменяем на 7
  if (digits.length > 0 && digits[0] === '8') {
    digits = '7' + digits.substring(1);
  }
  
  // Если начинается не с 7 и есть цифры - добавляем 7
  if (digits.length > 0 && digits[0] !== '7') {
    digits = '7' + digits;
    if (digits.length > 11) {
      digits = digits.substring(0, 11);
    }
  }
  
  // Если пусто, возвращаем пустую строку
  if (digits.length === 0) return '';
  
  // Форматируем по маске +7 (XXX) XXX-XX-XX
  let result = '+7';
  
  if (digits.length > 1) {
    const areaCode = digits.substring(1, Math.min(4, digits.length));
    result += ' (' + areaCode;
    if (areaCode.length === 3) {
      result += ')';
    }
  }
  
  if (digits.length > 4) {
    result += ' ' + digits.substring(4, Math.min(7, digits.length));
  }
  
  if (digits.length > 7) {
    result += '-' + digits.substring(7, Math.min(9, digits.length));
  }
  
  if (digits.length > 9) {
    result += '-' + digits.substring(9, 11);
  }
  
  return result;
};

/**
 * Хук для управления маской телефона с корректным удалением
 */
export const handlePhoneInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  prevValue: string,
  setValue: (value: string) => void
) => {
  const newValue = e.target.value;
  const formatted = formatPhone(newValue, prevValue);
  setValue(formatted);
};

export const isValidPhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 11 && digits[0] === '7';
};

/**
 * Обработчик нажатия клавиш для корректного удаления
 */
export const handlePhoneKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  currentValue: string,
  setValue: (value: string) => void
) => {
  if (e.key === 'Backspace') {
    const input = e.target as HTMLInputElement;
    const cursorPos = input.selectionStart || 0;
    
    // Если курсор после закрывающей скобки или после пробела после неё
    // Позиция 8 = "+7 (XXX)" — закрывающая скобка
    // Позиция 9 = "+7 (XXX) " — пробел после скобки
    if (cursorPos === 9 || cursorPos === 8) {
      e.preventDefault();
      // Удаляем последнюю цифру кода региона
      const digits = currentValue.replace(/\D/g, '');
      if (digits.length > 1) {
        const newDigits = digits.slice(0, -1);
        const formatted = formatPhone('+' + newDigits, currentValue);
        setValue(formatted);
        
        // Устанавливаем курсор в конец
        setTimeout(() => {
          input.setSelectionRange(formatted.length, formatted.length);
        }, 0);
      }
    }
  }
};
