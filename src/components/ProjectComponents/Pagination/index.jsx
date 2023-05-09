import * as c from './style'

const MAX_ITEMS = 5
const MAX_LEFT = (MAX_ITEMS - 1) / 2

//Offset = intervalo de registros que quero pular
const Pagination = ({ limit, total, offset, setOffset }) => {

    //Verificação para evitar divisão por 0 na primeira página
    const currentPage = offset ? (offset / limit) + 1 : 1
    const totalPages = Math.ceil(total / limit)

    //Os botões que ficam atrás do atual, faz a verificação através do max pra ele não ser negativo
    const first = Math.max(currentPage - MAX_LEFT, 1)

    function onPageChange(page) {
        setOffset((page - 1) * limit)
    }

    //Array from cria um array com base em um valor
    return (
        <c.paginationContainer>
            <c.PaginationList>
                <c.PaginationItem>
                    <c.PaginationItemButton disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                        &lt;
                    </c.PaginationItemButton>
                </c.PaginationItem>

                {Array.from({ length: Math.min(MAX_ITEMS, totalPages) })
                    .map((_, index) => index + first)
                    .map((page) =>
                        page <= totalPages ? (
                            <c.PaginationItem key={page}>
                                <c.PaginationItemButton active={page === currentPage} onClick={() => onPageChange(page)}>
                                    {page}
                                </c.PaginationItemButton>
                            </c.PaginationItem>
                        ) : null
                    )}

                <c.PaginationItem>
                    <c.PaginationItemButton disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                        &gt;
                    </c.PaginationItemButton>
                </c.PaginationItem>
            </c.PaginationList>
        </c.paginationContainer>
    )
}

export default Pagination