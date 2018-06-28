function LoadingIndicator (loading) {
  return (
    loading.icon && loading.icon === true
      ? <div className='loading-icon-wrap'>
        <img src='/static/loadingicon.gif' alt='loading icon' />
      </div>
      : null
  )
}
export default LoadingIndicator
