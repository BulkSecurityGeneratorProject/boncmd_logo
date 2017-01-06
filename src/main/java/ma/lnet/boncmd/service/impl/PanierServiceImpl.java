package ma.lnet.boncmd.service.impl;

import ma.lnet.boncmd.service.PanierService;
import ma.lnet.boncmd.domain.Panier;
import ma.lnet.boncmd.repository.PanierRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Panier.
 */
@Service
@Transactional
public class PanierServiceImpl implements PanierService{

    private final Logger log = LoggerFactory.getLogger(PanierServiceImpl.class);
    
    @Inject
    private PanierRepository panierRepository;

    /**
     * Save a panier.
     *
     * @param panier the entity to save
     * @return the persisted entity
     */
    public Panier save(Panier panier) {
        log.debug("Request to save Panier : {}", panier);
        Panier result = panierRepository.save(panier);
        return result;
    }

    /**
     *  Get all the paniers.
     *  
     *  @return the list of entities
     */
    
    @Transactional(readOnly = true) 
    public List<Panier> findAll() {
        log.debug("Request to get all Paniers");
        List<Panier> result = panierRepository.findAll();

        return result;
    }
//    @Transactional(readOnly = true) 
//    public List<Panier> findAll() {
//        log.debug("Request to get all Paniers");
//        List<Panier> result = panierRepository.findAll();
//
//        return result;
//    }

    /**
     *  Get one panier by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Panier findOne(Long id) {
        log.debug("Request to get Panier : {}", id);
        Panier panier = panierRepository.findOne(id);
        return panier;
    }

    /**
     *  Delete the  panier by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Panier : {}", id);
        panierRepository.delete(id);
    }
}
