package ma.lnet.boncmd.service.impl;

import ma.lnet.boncmd.service.ProduitService;
import ma.lnet.boncmd.domain.Produit;
import ma.lnet.boncmd.repository.ProduitRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Produit.
 */
@Service
@Transactional
public class ProduitServiceImpl implements ProduitService{

    private final Logger log = LoggerFactory.getLogger(ProduitServiceImpl.class);
    
    @Inject
    private ProduitRepository produitRepository;

    /**
     * Save a produit.
     *
     * @param produit the entity to save
     * @return the persisted entity
     */
    public Produit save(Produit produit) {
        log.debug("Request to save Produit : {}", produit);
        Produit result = produitRepository.save(produit);
        return result;
    }

    /**
     *  Get all the produits.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<Produit> findAll() {
        log.debug("Request to get all Produits");
        List<Produit> result = produitRepository.findAll();

        return result;
    }

    /**
     *  Get one produit by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Produit findOne(Long id) {
        log.debug("Request to get Produit : {}", id);
        Produit produit = produitRepository.findOne(id);
        return produit;
    }

    /**
     *  Delete the  produit by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Produit : {}", id);
        produitRepository.delete(id);
    }
}
