const Message = ({ variant, children }) => {
    let bgColorClass = '';
    let textColorClass = '';
    
    switch (variant) {
      case 'success':
        bgColorClass = 'bg-green-100';
        textColorClass = 'text-green-700';
        break;
      case 'danger':
        bgColorClass = 'bg-red-100';
        textColorClass = 'text-red-700';
        break;
      case 'warning':
        bgColorClass = 'bg-yellow-100';
        textColorClass = 'text-yellow-700';
        break;
      default:
        bgColorClass = 'bg-blue-100';
        textColorClass = 'text-blue-700';
    }
  
    return (
      <div className={`rounded-md p-4 ${bgColorClass} ${textColorClass}`}>
        {children}
      </div>
    );
  };
  
  Message.defaultProps = {
    variant: 'info',
  };
  
  export default Message;
  